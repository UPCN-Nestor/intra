import { Component, OnInit } from '@angular/core';
import {DataGridModule} from 'primeng/primeng';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent implements OnInit {

  modulos:any[];
    
  titulo: string;
    
  imageDir = "intra/src/assets/imagenes/";
  
  constructor() { }

  ngOnInit() {
    
      this.titulo = "x";
    
      this.modulos = [{nombre:'Consumos', path:'consumos', desc: 'Reporte de consumos', img: environment.baseUrl + this.imageDir + "Consumos.png"}, 
                      {nombre:'Impresión de Factura', path:'factura', desc: 'Módulo para reimprimir facturas adeudadas, para utilizar en terminal de autoservicio'}, 
                      {nombre:'Ejemplo link externo', desc: 'asd', icon: 'fa-external-link'}, 
                      {nombre:'y', desc: 'yy'}, 
                      {nombre:'z', desc: 'zz'}];
      // Cada mÃ³dulo podrÃ­a indicar su Ã­cono? Al menos entre fa-sign-in y fa-external-link?
  }

  selectModulo(path) {
      window.location.href = "/" + path.toLowerCase() + "/index.html";
      //this.r.navigateByUrl("/" + path.toLowerCase() + "/index.html");
  }
    
}

