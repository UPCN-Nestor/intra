import { Component, OnInit, ElementRef } from '@angular/core';

import {SelectItem} from 'primeng/primeng';
import {InputTextModule, PasswordModule} from 'primeng/primeng';
import {MessagesModule, Message} from 'primeng/primeng';
import {GrowlModule, ButtonModule, ToolbarModule} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import {HttpModule, Response, Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';

import { environment } from '../environments/environment';

import { HeaderModule } from 'upcn-header-lib';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user = '';

  title = 'Administración de Taller';

  baseURL = environment.baseUrl;
  cols : SelectItem[];
  colsMetadata : {};    
  selectedCol : string;
  jsonURL : string;

  //baseURL: string;
  defaultFilters : {} = {};

  constructor(private http: Http, private el:ElementRef) { 
    //alert(el.nativeElement.getAttribute('base'));
    //this.baseURL = el.nativeElement.getAttribute('base');        
}

ngOnInit() {

  //this.inicializarGrilla();

  this.defaultFilters["fecha_creacion"] = {desde: "2017-01-01", hasta: "2017-12"};
  //this.defaultFilters["Consumo"] = "100000";
  
  this.cols = [
               {value: 'fecha_creacion', label: 'Fecha inicio' },
               {value: 'fecha_cierre', label: 'Fecha fin' },
               {value: 'factura_numero', label: 'Nº Factura'},
               
           ];
  
  this.colsMetadata = { 
                        fecha_creacion: { orden : 'alfabetico', filtro: this.inDateRange, inputFiltro: 'dateRangeMes', lazy: true },
                        fecha_cierre: { orden : 'alfabetico', filtro: this.inDateRange, inputFiltro: 'dateRangeDia', lazy: true },
                        factura_numero: { orden : 'alfabetico', inputFiltro: 'text'}
                        
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
}


inicializarGrilla() {

  let paramg: URLSearchParams = new URLSearchParams();
  paramg.set('id', '10');
  
  this.http.get(environment.baseUrl + 'php/userspice/tal_tipos_vehiculos_r.php', {withCredentials: true, search: paramg})
    .toPromise().then(res => {
      console.log(res);
    });
  
  let params: URLSearchParams = new URLSearchParams();
  params.set('id', '10');
  //params.set('descripcion', 'cambiada');
    /*
  this.http.post(environment.baseUrl + 'php/userspice/tal_tipos_vehiculos_w.php', params, {withCredentials: true})
    .toPromise().then(res => {
      console.log(res);
    });*/
  this.http.delete(environment.baseUrl + 'php/userspice/tal_tipos_vehiculos_w.php', {withCredentials: true, search: params})
    .toPromise().then(res => {
      console.log(res);
    });
    /*
  this.http.put(environment.baseUrl + 'php/userspice/tal_tipos_vehiculos_w.php', params, {withCredentials: true})
    .toPromise().then(res => {
      console.log(res);
    });*/
}





// Funciones para agrupar

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
            
  mayor(n1, n2) : boolean {
    return parseFloat(""+n1) >= parseFloat(""+n2);
  }

  startsWith(s1:string, s2:string) : boolean {
    return s1.includes(s2);
  }

  inDateRange(d:string, dr:any) : boolean {
    let inicio = dr["desde"] ? parseInt(dr["desde"]) : -Number.MAX_VALUE;
    let fin = dr["hasta"] ? parseInt(dr["hasta"]) : Number.MAX_VALUE;
    let fecha = parseInt(d);
    //alert(inicio + " " + fin + " " + fecha);
    return fecha >= inicio && fecha <= fin;                
  }

  inArray(v:string, arr:string[]) : boolean {
  /* if(arr.indexOf(v) > -1)
        alert(v + " " + arr + " " + arr.indexOf(v));*/
    return arr.indexOf(v) > -1;
  }
            
}


interface Consumo {
  Cons_area : string;
  ETTCodigo : string;
  Cons_cate: number; 
  Periodo: number;
  Consumo: number;
  Pico: number;
  FPico: number;
  Valle: number;
  Reactiva: number;
  PotPico: number;
  PotFPico: number;
}

