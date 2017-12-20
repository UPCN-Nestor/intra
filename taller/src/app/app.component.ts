import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import {SelectItem} from 'primeng/primeng';
import {InputTextModule, PasswordModule, DropdownModule, PanelModule} from 'primeng/primeng';
import {MessagesModule, Message} from 'primeng/primeng';
import {GrowlModule, ButtonModule, ToolbarModule} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import {HttpModule, Response, Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { AsyncPipe } from '@angular/common';

import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: any;
  permissions: any;

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
  
  entidades: SelectItem[];
  entidadSeleccionada: any;

  @ViewChild('header')
  private header : ElementRef;

  // Configuración de ABM Vehículos   
  vcols = [ {value: 'id', label: ''}, {value: 'numero', label: 'Número'}, {value: 'id_tipo_vehiculo', label: 'Tipo vehículo'}, 
    {value: 'patente', label: 'Patente'}, {value: 'descripcion', label: 'Descripción'}];

  vcolsMetadata = {
    id: { hidden: 'true '},
    id_tipo_vehiculo: { orden: 'alfabetico', filtro: this.equals, inputFiltro: 'multiselect', fk_url: environment.baseUrl + 'php/userspice/tal_tipos_vehiculos_r.php',
      fk_mostrar:'descripcion'},
    numero: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text'},
    patente: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text'}, 
    descripcion: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text'}
  }
  vselectedCol = "numero";     
  vjsonURL = environment.baseUrl + 'php/userspice/tal_vehiculos_r.php';
  vwriteURL = environment.baseUrl + 'php/userspice/tal_vehiculos_w.php';     
  vdefaultFilters = {};

  // Configuración de ABM Tipos de tareas
  ttcols = [ {value: 'id', label: ''}, {value: 'nombre', label: 'Descripción'}];
  ttcolsMetadata = {
    id: { hidden: 'true '},
    nombre: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text'}
  }
  ttjsonURL = environment.baseUrl + 'php/userspice/tal_tipos_tareas_r.php';
  ttwriteURL = environment.baseUrl + 'php/userspice/tal_tipos_tareas_w.php';     
  ttdefaultFilters = {};

  // Configuración de ABM Tipos de vehículos
  tvcols = [ {value: 'id', label: ''}, {value: 'descripcion', label: 'Descripción'}];
  tvcolsMetadata = {
    id: { hidden: 'true '},
    descripcion: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text'}
  }
  tvjsonURL = environment.baseUrl + 'php/userspice/tal_tipos_vehiculos_r.php';
  tvwriteURL = environment.baseUrl + 'php/userspice/tal_tipos_vehiculos_w.php';     
  tvdefaultFilters = {};

  // Configuración de ABM Responsables
  rcols = [ {value: 'id', label: ''}, {value: 'legajo', label: 'Legajo'}, {value: 'nombre', label: 'Nombre'}];
  rcolsMetadata = {
    id: { hidden: 'true '},
    nombre: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text'},
    legajo: { orden: 'numerico', filtro: this.mayor, inputFiltro: 'text'}
  }
  rjsonURL = environment.baseUrl + 'php/userspice/tal_responsables_r.php';
  rwriteURL = environment.baseUrl + 'php/userspice/tal_responsables_w.php';     
  rdefaultFilters = {};

  // Configuración de ABM Proveedores
  pcols = [ {value: 'id', label: ''}, {value: 'nombre', label: 'Nombre'}, {value: 'CUIT', label: 'CUIT'}, {value: 'telefono', label: 'Teléfono'},
    {value: 'direccion', label: 'Dirección'}];
  pcolsMetadata = {
    id: { hidden: 'true '},
    nombre: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text'},
    CUIT: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text'},
    telefono: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text'},
    direccion: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text'}
  }
  pjsonURL = environment.baseUrl + 'php/userspice/tal_proveedores_r.php';
  pwriteURL = environment.baseUrl + 'php/userspice/tal_proveedores_w.php';     
  pdefaultFilters = {};

  constructor(private http: Http, private el:ElementRef) { 
      //alert(el.nativeElement.getAttribute('base'));
      //this.baseURL = el.nativeElement.getAttribute('base');          
  }


  ngOnInit() {

      //this.inicializarGrilla();
      this.entidadSeleccionada = 0;
      
      this.defaultFilters["fecha_creacion"] = {desde: "2017-01-01", hasta: "2017-12-01"};
      //this.defaultFilters["Consumo"] = "100000";
      
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
                              id_vehiculo: { orden: 'alfabetico', filtro: this.inArray, inputFiltro: 'multiselect', fk_url: environment.baseUrl + 'php/userspice/tal_vehiculos_r.php',
                                fk_mostrar:'numero'},
                              id_tipo_tarea: { orden: 'alfabetico', filtro: this.inArray, inputFiltro: 'multiselect', fk_url: environment.baseUrl + 'php/userspice/tal_tipos_tareas_r.php',
                                  fk_mostrar:'nombre'},
                              id_responsable: { orden: 'alfabetico', filtro: this.inArray, inputFiltro: 'multiselect', fk_url: environment.baseUrl + 'php/userspice/tal_responsables_r.php',
                                  fk_mostrar:'nombre'},
                              fecha_creacion: { orden : 'alfabetico', filtro: this.inDateRange, inputFiltro: 'dateRangeDia', defaultNew:'%hoy%', lazy: true},
                              factura_numero: { orden : 'alfabetico', filtro: this.startsWith, inputFiltro: 'text', defaultNew:'A'},
                              id_proveedor: { orden: 'alfabetico', filtro: this.inArray, inputFiltro: 'multiselect', fk_url: environment.baseUrl + 'php/userspice/tal_proveedores_r.php',
                                  fk_mostrar:'nombre'},
                              factura_importe: { orden: 'numerico', filtro: this.mayor, inputFiltro: 'text', agrupado: this.sum},
                              horas_hombre: { orden: 'numerico', filtro: this.mayor, inputFiltro: 'text', agrupado: this.sum},
                              estado: { orden: 'alfabetico', filtro: this.startsWith, inputFiltro: 'text', agrupado: this.vacio, calculada: this.estado,
                                    tooltip: 'Una tarea se considera finalizada si se le cargó número de factura u horas hombre' }
                             

                              //'Consumo': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text', tooltip: 'En <<unidad>>' },      

      };
              
      this.selectedCol = "fecha_creacion";     

      this.jsonURL = environment.baseUrl + 'php/userspice/tal_tareas_r.php';
      this.writeURL = environment.baseUrl + 'php/userspice/tal_tareas_w.php';      
      this.backendURL = environment.baseUrl;
      
      //this.setupPermissions();
  }


  tienePermiso(cual) {
    if(!this.header['permissions'])
        return false;

    return this.header['permissions'].filter(x=>x.name==cual).length > 0;
  }

  getEntidades() {    
    let entidades = [ {value: '0', label: 'Tareas'} ];
    
    if(this.tienePermiso('tal_gerencia'))
        entidades.push({value: '1', label: 'Vehiculos'}, {value: '2', label: 'Proveedores'}, {value: '3', label: 'Responsables'}, {value: '4', label: 'Tipos de entidades'});

    return entidades;
  }

  getPanelTitle() {
    let panelTitle = 'Módulo de Administración de Taller';
    if(this.tienePermiso("tal_gerencia"))
        panelTitle += " - Gerencia";
    else if(this.tienePermiso("tal_usuario"))
        panelTitle += " - Usuario";
    else 
        panelTitle += " - No autorizado     ";

    return panelTitle;
  }

  click(fila) {
      alert(fila.Cons_area);
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

  // Funciones para columnas calculadas 

  estado(row) {
    return (row["horas_hombre"] == null || row["horas_hombre"] == 0) && 
            (row["factura_numero"] == null || row["factura_numero"] == "") 
                ? "Pendiente" : "Finalizada";
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

