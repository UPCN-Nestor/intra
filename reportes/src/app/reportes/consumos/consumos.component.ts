import { Component, OnInit, Attribute,  ElementRef  } from '@angular/core';
import {HttpModule, Response, Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {SelectItem} from 'primeng/primeng';
import { environment } from '../../../environments/environment';

import {Router} from '@angular/router';

@Component({
  selector: 'app-consumos',
  templateUrl: './consumos.component.html',
  styleUrls: ['./consumos.component.css']
})
export class ConsumosComponent implements OnInit {
  
    title = 'Reporte de Consumos';
        
    cols : SelectItem[];
    colsMetadata : {};    
    selectedCol : string;
    jsonURL : string;
    multiselectURL : string;
    //baseURL: string;
    defaultFilters : {} = {};
    
    constructor(private http: Http, private el:ElementRef) { 
        //alert(el.nativeElement.getAttribute('base'));
        //this.baseURL = el.nativeElement.getAttribute('base');        
    }

    ngOnInit() {
                
        this.defaultFilters["Periodo"] = {"desde" : "2016-07", "hasta" : "2020-01"};
        //this.defaultFilters["Consumo"] = "100000";
        
        this.cols = [
                     {value: 'Cons_area', label: 'Área' },
                     {value: 'ETTCodigo', label: 'Código' },
                     {value: 'Cons_cate', label: 'Categoría' },
                     {value: 'Periodo', label: 'Periodo' },
                     {value: 'Consumo', label: 'Consumo' },
                     {value: 'Pico', label: 'Pico' },
                     {value: 'FPico', label: 'Fuera de pico' },
                     {value: 'Valle', label: 'Valle' },
                     {value: 'Reactiva', label: 'Reactiva' },
                     {value: 'PotPico', label: 'Potencia pico' },
                     {value: 'PotFPico', label: 'Potencia f/pico' }
                 ];
        
        this.colsMetadata = { 
                              'Cons_area': { 'orden' : 'alfabetico', 'filtro': this.inArray, 'inputFiltro': 'multiselect' },    
                              'ETTCodigo': { 'orden' : 'alfabetico', 'filtro': this.inArray, 'inputFiltro': 'multiselect' },
                              'Cons_cate': { 'orden' : 'numerico', 'filtro': this.inArray, 'inputFiltro': 'multiselect' },
                              'Periodo': { 'orden' : 'alfabetico', 'filtro': this.inDateRange, 'inputFiltro': 'date', lazy: true},
                              'Consumo': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text', tooltip: 'En <<unidad>>' },      
                              'Pico': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' },
                              'FPico': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' },
                              'Valle': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' },
                              'Reactiva': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' },
                              'PotPico': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' },
                              'PotFPico': { 'orden': 'numerico', 'agrupado': this.sum, 'filtro': this.mayor, 'inputFiltro': 'text' }
        };
              
        this.selectedCol = "Cons_area";     
      
        this.jsonURL = environment.baseUrl + 'php/userspice/getJSONConsumo.php';
        this.multiselectURL = environment.baseUrl + 'php/userspice/getOpcionesConsumo.php';
        
        //alert(this.jsonURL);
        
        // Los datos de login vienen desde afuera (no angular)
        
        /*
        let data = new URLSearchParams();
        data.append('username', 'admin');
        data.append('password', 'password');

        this.http.post('http://localhost:80/intra/php/userspice/users/login.php', data, {withCredentials: true} ).subscribe((response: Response)=> {
                alert(response);
          }, error => {
              alert(error.json());
              console.log(JSON.stringify(error.json()));
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