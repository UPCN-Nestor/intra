import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import {HttpModule, Response, Http, Headers, URLSearchParams} from '@angular/http';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ConfirmationService]
})
export class SidebarComponent implements OnInit {

  filas: SidebarElement[];

  @Input() backendURL: string;
  @Input() user:any;
  @Input() grid:any;
  @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  loading = false;
  
  public selected: SidebarElement;
  
  nombreEliminar: string = "";
  
  constructor(private http:Http, private confirmationService: ConfirmationService) {
      this.user = 1;
      this.grid = "consumos";
  }

  ngOnInit() {
      this.loading = true;
      this.loadSidebarElements();      
  }

  loadSidebarElements() {
      this.getSidebarElements().then(f => { this.filas = f;});
  }
  
  getSidebarElements() : Promise<SidebarElement[]> {
      
      let params: URLSearchParams = new URLSearchParams();
      params.set('grid', this.grid);

      return this.http.get(this.backendURL + 'php/userspice/getFavoritos.php', {withCredentials: true, search: params})
                  .toPromise()
                  .then(res => <SidebarElement[]> res.json())
                  .then(data => { this.loading = false; return data; });
  }

  
  confirm(id, nombre) {
      this.nombreEliminar = nombre;
      this.confirmationService.confirm({
          message: '¿Está seguro de que desea eliminar la consulta "' + this.nombreEliminar + '"?',
          accept: () => {
              let params: URLSearchParams = new URLSearchParams();
              params.set('id', id);
              this.http.get(this.backendURL + 'php/userspice/delFavorito.php', {withCredentials: true, search: params})
                  .toPromise()
                  .then(res => res.json()); // Acá podría devolver OK o error.
              
              this.loadSidebarElements();
          }
      });
  }
 
  select(consulta, reload) {
      
      let params: URLSearchParams = new URLSearchParams();
      params.set('id', consulta.id);
  
      this.http.get(this.backendURL + 'php/userspice/useFavorito.php', {withCredentials: true, search: params})
                  .toPromise()
                  .then(res => <SidebarElement[]> res.json())
                  .then(data => { return data; });
      
      this.selected = consulta;
      if(reload) // Si hay que recargar la grilla de consultas guardadas, disparo el evento
          this.changed.next(true);
      
      this.loadSidebarElements();
  }
  
}


export interface SidebarElement {
    id: number;
    nombre: string;
    groupby: string;
    lastused: Date;
    sortby: string;
    sortbyasc: number;
    filtros: string;
    ejex: string;
    ejey: string;
    chart: string;
}

