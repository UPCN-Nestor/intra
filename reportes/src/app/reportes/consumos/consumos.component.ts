import { Component, OnInit, ElementRef } from '@angular/core';

import {SelectItem} from 'primeng/primeng';
import {InputTextModule, PasswordModule} from 'primeng/primeng';
import {MessagesModule, Message} from 'primeng/primeng';
import {GrowlModule, ButtonModule, ToolbarModule} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import {HttpModule, Response, Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';

import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-consumos',
  templateUrl: './consumos.component.html',
  styleUrls: ['./consumos.component.css']
})
export class ConsumosComponent implements OnInit {
  
      user = '';
    
      title = 'Administración de Taller';
    
      baseURL = environment.baseUrl;
      cols : SelectItem[];
      colsMetadata : {};    
      selectedCol : string;
      jsonURL : string;
      writeURL : string;
      //multiselectURL : string;
      backendURL: string;
      defaultFilters : {} = {};
      

      constructor(private http: Http, private el:ElementRef) { 
          //alert(el.nativeElement.getAttribute('base'));
          //this.baseURL = el.nativeElement.getAttribute('base');        
      }
    
      ngOnInit() {
               
          //this.inicializarGrilla();
    
          this.defaultFilters["fecha_creacion"] = {desde: "2017-01-01", hasta: "2018-12-01"};
          //this.defaultFilters["Consumo"] = "100000";

          //alert(this.fnRowStyle());

          this.cols = [
                      {value: 'id', label: ''},
                      {value: 'id_vehiculo', label: 'Vehículo'},
                      {value: 'id_tipo_tarea', label: 'Tipo tarea'},
                      {value: 'id_responsable', label: 'Responsable'},
                      {value: 'fecha_creacion', label: 'Fecha' },
                      {value: 'factura_numero', label: 'Nº Factura'},  
                      {value: 'id_proveedor', label: 'Proveedor'},
                      {value: 'factura_importe', label: 'Monto'},
                      {value: 'horas_hombre', label: 'Horas hombre'},
                      {value: 'estado', label: 'Estado'}                      
                  ];
          
          this.colsMetadata = { 
                                  id: { hidden: 'true '},
                                  id_vehiculo: { orden: 'alfabetico', filtro: this.equals, inputFiltro: 'multiselect', fk_url: environment.baseUrl + 'php/userspice/tal_vehiculos_r.php',
                                    fk_mostrar:'numero'},
                                  id_tipo_tarea: { orden: 'alfabetico', filtro: this.equals, inputFiltro: 'multiselect', fk_url: environment.baseUrl + 'php/userspice/tal_tipos_tareas_r.php',
                                      fk_mostrar:'nombre'},
                                  id_responsable: { orden: 'alfabetico', filtro: this.equals, inputFiltro: 'multiselect', fk_url: environment.baseUrl + 'php/userspice/tal_responsables_r.php',
                                      fk_mostrar:'nombre'},
                                  fecha_creacion: { orden : 'alfabetico', filtro: this.inDateRange, inputFiltro: 'dateRangeDia', defaultNew:'%hoy%', lazy: true},
                                  factura_numero: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text', defaultNew:'A'},
                                  id_proveedor: { orden: 'alfabetico', filtro: this.equals, inputFiltro: 'multiselect', fk_url: environment.baseUrl + 'php/userspice/tal_proveedores_r.php',
                                      fk_mostrar:'nombre'},
                                  factura_importe: { orden: 'numerico', filtro: this.mayor, inputFiltro: 'text', agrupado: this.sum},
                                  horas_hombre: { orden: 'numerico', filtro: this.mayor, inputFiltro: 'text', agrupado: this.sum},
                                  estado: { orden: 'alfabetico', filtro: this.startsWith, inputFiltro: 'text', agrupado: this.vacio, calculada: this.estado }
    
                                  /*    
                                  'ETTCodigo': { 'orden' : 'alfabetico', 'filtro': this.inArray, 'inputFiltro': 'multiselect' },
                                  'Cons_cate': { 'orden' : 'numerico', 'filtro': this.inArray, 'inputFiltro': 'multiselect' },
                                  'Periodo': { 'orden' : 'alfabetico', 'filtro': this.inDateRange, 'inputFiltro': 'date', lazy: true},
                                  'Consumo': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text', tooltip: 'En <<unidad>>' },      
                                  'Pico': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' },
                                  'FPico': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' },
                                  'Valle': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' },
                                  'Reactiva': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' },
                                  'PotPico': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' },
                                  'PotFPico': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' }*/
          };
                  
          this.selectedCol = "fecha_creacion";     
    
          this.jsonURL = environment.baseUrl + 'php/userspice/tal_tareas_r.php';
          this.writeURL = environment.baseUrl + 'php/userspice/tal_tareas_w.php';      
          this.backendURL = environment.baseUrl;  
      }
      
      getLoggedUser() {
        return 1;
      }
    
    
      click(fila) {
          alert(fila.Cons_area);
      }
    

      estado(row) {
        return (row["horas_hombre"] == null || row["horas_hombre"] == 0) && 
                (row["factura_numero"] == null || row["factura_numero"] == "") 
                    ? "Pendiente" : "Finalizada";


      }

      // Funciones para agrupar
      
      vacio() : string { return ""; }
      
      avg(values:number[]) : number {
          let toRet = 0;
          for(var n of values)
              toRet += parseFloat(""+n);
          return parseFloat((toRet / values.length).toFixed(2));
      }
      
      sum(values:number[]) : number {
          let toRet = 0;
          for(var n of values)
              toRet += parseFloat(""+n);
          return parseFloat(toRet.toFixed(2));
      }
      
      range(values:number[]) : string {
          let noRep = values.sort((a,b)=>{return a-b;}).filter(function(item, pos) {
              return values.indexOf(item) == pos;
          })
          
          return noRep.toString();
      }
      
      sharedStart(array:string[]) : string {
          var A= array.concat().sort(), 
          a1= A[0], a2= A[A.length-1], L= a1.length, i= 0;
          while(i<L && a1.charAt(i)=== a2.charAt(i)) i++;
          return a1.substring(0, i);
      }
          
      // Predicados para filtros
                  
      exactStr(s1:string, s2:string) : boolean {      
          return s1.trim() === s2.trim();        
      }        
      
      equals(n1, n2) : boolean {
        return n1==n2;
      }
                  
      mayor(n1, n2) : boolean {
          return parseFloat(""+n1) >= parseFloat(""+n2);
      }
      
      startsWith(s1:string, s2:string) : boolean {
          return s1.includes(s2);
      }
      
      inDateRange(d:string, dr:any) : boolean {
          var re = new RegExp('-', 'g');        
          let inicio = dr["desde"] ? parseInt(dr["desde"].replace(re,'')) : -Number.MAX_VALUE;
          let fin = dr["hasta"] ? parseInt(dr["hasta"].replace(re,'')) : Number.MAX_VALUE;
          let fecha = parseInt(d.replace(re,''));
          //alert(inicio + " " + fin + " " + fecha);
          return fecha >= inicio && fecha <= fin;                
      }
      
      inArray(v:string, arr:string[]) : boolean {
         /* if(arr.indexOf(v) > -1)
              alert(v + " " + arr + " " + arr.indexOf(v));*/
          return arr.indexOf(v) > -1;
      }
                  
    }
    
    