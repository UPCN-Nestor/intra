import { Component, OnInit, Injectable, Input, ViewChild, Inject } from '@angular/core';
import {HttpModule, Response, Http, Headers,URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/debounceTime';

import { DataTableModule,SharedModule, DataTable, DropdownModule, SelectItem, GrowlModule, Message, CheckboxModule, DragDropModule, 
    PanelModule, InputTextModule, SliderModule, ButtonModule, DialogModule , OverlayPanelModule, MultiSelectModule, TooltipModule} from 'primeng/primeng';

import { SidebarComponent } from '../sidebar/sidebar.component';

import {DpDatePickerModule, IDatePickerConfig} from 'ng2-date-picker';


import {md5} from './md5';

var timeout = null; // Debe ser global para que funcione el debounce

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {


  filas : Fila[];
  filasDesagrupado : Fila[]; // "Backup"
 
  filteredValues : Fila[];
  
  @ViewChild(SidebarComponent) sidebar:SidebarComponent;
  @Input() nombreGrid = "";
  @Input() tituloGrid = "";
  @Input() cols : SelectItem[];
  colsParaAgrupar : SelectItem[];
  @Input() colsMetadata : {};
  @Input() jsonURL : string;
  @Input() multiselectURL : string;

  @Input() backendURL : string;
    
  @Input() selectedCol : string;
  orderAscDesc = "1";
  agruparCol: string = "";
  
  agrupar : boolean = false;

  totales : {}
  
  @Input() defaultFilters : {}
  filters : any;
  
  multiselectValues : {};
  
  msgs : Message[] = [];
  
  chartData : any;
  
  tiposGrafico: SelectItem[]; 
  tipoGrafico: string = "";
  chartX : string = "";
  chartY : string = "";
 
  datePickerConfig : IDatePickerConfig;
  mesesEspanol = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  
  mostrarPopupGuardar = false;
  nombreGuardar = "";
  
  debounceTime = 300;
  
  loading = false; // Para que en la carga inicial los filtros default no activen el refresh lazy.
  
  constructor(private http: Http) { 

  }

  
  ngOnInit() {
            
      this.loading = true;
      
      this.totales = {};
      this.filters = this.defaultFilters;
      
      this.tipoGrafico = "line";          
  
      this.datePickerConfig = { appendTo : "body", format: "YYYY-MM", disableKeypress: true, 
              monthBtnFormatter : m => { return this.mesesEspanol[m.month()] }                                 
      };      
      
      this.tiposGrafico =  [
                  {value: 'line', label: 'Líneas' },
                  {value: 'pie', label: 'Circular' }
             ];
      
      this.multiselectValues = {};
      
      this.getFilas().then(f => { 
          this.filas = f; 
          this.filasDesagrupado = this.filas;
          
          this.loading = false;
          this.agruparChanged(null);
      });
      
      this.colsParaAgrupar = [{value: '', label: '(Ninguna)' }].concat(this.cols);    

      this.cols.forEach(c => {
          if(this.filters[c.value])
              return;
          
          if(this.colsMetadata[c.value].inputFiltro == "date")              
              this.filters[c.value]={"desde" : "", "hasta" : ""};
          else if(this.colsMetadata[c.value].inputFiltro == "multiselect") {
              this.filters[c.value]=[];
              this.getMultiselectValues(c.value).then(res => { 
                      let v = res.json().map(x=>x[c.value]); 
                      v.forEach(a => {
                              if(this.multiselectValues[c.value]) 
                                  this.multiselectValues[c.value].push({label: a, value: a})
                              else
                                  this.multiselectValues[c.value] = [{label: a, value: a}];
                      });                      
                  });                      
          }
          else
              this.filters[c.value]="";                
      });
         
      //this.agruparChanged(null);
  }
  
  msg(severity, summary, detail)
  {
      let sev = severity;
      if(severity=="")
          sev = "info";
      this.msgs.push({severity: sev, summary: summary, detail: detail });
  }
 
  
  getMultiselectValues(col) : any {
      let params: URLSearchParams = new URLSearchParams();
      params.set('campo', col);
  
      return this.http.get(this.multiselectURL, {withCredentials: true, search: params})
          .toPromise()
      /*
      let toRet = [];      
      this.filasDesagrupado.map(x => x[col]).filter(this.onlyUnique).forEach(u => toRet.push({label: u, value: u}));
      return toRet;*/
          
  }
  
 
  // Frente a cualquier cambio de grupo o filtro
  agruparChanged(event) {
      
      if(!this.filasDesagrupado)
          return;
      
      this.filas = this.filasDesagrupado; // Vuelvo a las filas originales
      
      // Aplico cada filtro
      Object.keys(this.filters).forEach(f => {     
          let fc = this.colsMetadata[f] ? this.colsMetadata[f].filtro : null;
          if(!fc)
              fc = this.exact; // Por defecto filtro por coincidencia exacta
         
          let val = this.filters[f];
          if(val) {
              if(!val.hasOwnProperty('length') || val.length > 0)
              {
                  //this.msg('info', 'Filtro aplicado', '' );
                  this.filas = this.filas.filter(x => fc(x[f], val));
              }
          }
      });      
      
      if(this.agruparCol != "") {      
          this.msg('', 'Agrupamiento', 'Agrupado por '+this.agruparCol );
        
          this.filas = this.groupBy(this.sortBy(this.filas, this.agruparCol, 1), f => f[this.agruparCol]).map(grupo => { 
              let toRet = [];
              
              // Para cada columna, recorre todo el grupo y "sumariza" según la función que corresponda a la columna según sus metadatos (suma, promedio, etc.) 
              for(var si of this.cols) {                  
                  let colName = si.value;
                  if(colName == this.agruparCol)
                      toRet[colName] = grupo.members[0][colName]; // Columna por la cual agrupé: los valores de los miembros del grupo son todos iguales
                  else {                    
                      let colVals = grupo.members.map(f => f[colName]); // Array de valores de cierta columna en el grupo actual 
                      let fc = this.colsMetadata[colName] ? this.colsMetadata[colName].agrupado : null; // Función de agrupamiento de la columna
                      if(fc)
                          toRet[colName] = fc(colVals);
                  }
              }
              
              return toRet;
          });
          
          this.filas = this.sortBy(this.filas, this.selectedCol, this.orderAscDesc);
      }
      else {
          this.filas = this.sortBy(this.filas, this.selectedCol, this.orderAscDesc);
          //this.filas = this.filasDesagrupado;
      }
      
      // Totales de columnas
      for(var c of this.cols) {   
          let col = c.value;
          let fc = this.colsMetadata[col] ? this.colsMetadata[col].agrupado : null; // Se usa la función de agrupamiento de la columna, podría ser diferente la forma de agrupar y de totalizar
          if(fc) {
              let colVals = this.filas.map(f => f[col]);   
              this.totales[col] = fc(colVals);
          }
          else
              this.totales[col] = "";       
      }
      
      //this.reloadChartData();
  }
  
 
  refreshChart() {
      this.reloadChartData();
  }
  
  reloadChartData() {

      let rows;
      if(this.filteredValues)
          rows = this.filteredValues;
      else
          rows = this.filas;
      
      if(!rows)
          return;

      //this.msgs.push({severity:'info', summary:'Gráfico', detail:'Eje X: ' + this.chartX + ', Eje Y: ' + this.chartY });
      
      let groupedArray = this.groupByAndSum(rows, this.chartX, this.chartY);
      //this.sortedArray = this.groupedArray.sort((x,y) => x[this.selectedCol] - y[this.selectedCol] );
      
      let displayLabels = Object.keys(groupedArray);
      let displayData = this.values(groupedArray);

      let backgroundColors = this.colorsByHash(displayLabels);
      
      this.chartData = {
              datasets: [{
                  data: displayData,
                  label: this.chartY,
                  borderColor: this.tipoGrafico == "line" ? '#FF4444' : '#FFFFFF',
                  fill: false,
                  backgroundColor: this.tipoGrafico == "line" ? ["#FF4444"] : backgroundColors
              }],
              labels: displayLabels     
      }
  }
  
  colorsByHash(labels : string[]) {
      return labels.map(str => {
          var stringHexNumber = '#' + md5(str).slice(0, 6);
         
          return stringHexNumber;
      });
  }
      
  nameToColor(name) {
      var n = 'abcdefghijklmnopqrstuvwxyz'.split('');
      var r = name.split('').map(function(e) {return n.indexOf(e);}).join('');
      var l = parseFloat( '0.'+ (r*r*1000).toString().replace(/^0/, ''));
      return '#'+Math.floor(l*16777215).toString(16);
  }
  
  stringHash(s:string) {    
          var hash = 0;   
          if (s.length == 0) return hash;
          
          for (let i = s.length-1; i >= 0; i--) {
              let char = s.charCodeAt(i);   
              hash = ((hash<<5)-hash)+char;   
              hash = hash & hash;     
          }
   
                      alert(hash);
          return hash;    
  }


  checkLazyLoad(field) {
        
      if(this.colsMetadata[field].lazy) {    
          this.msgs.push({severity:'info', summary:'Lazy loading', detail:''+field});  
          this.loading = true;
          this.getFilas().then(f => {
              this.filasDesagrupado = f;
              this.agruparChanged(null);
              this.loading = false;
          });     
      }
      else {
          this.agruparChanged(null);
      }
  }
                      
  getFilas() : Promise<Fila[]> {
      
      let lazyFilters = {};
      this.cols.forEach(col => { 
          if(this.colsMetadata[col.value].lazy && this.filters[col.value])
              lazyFilters[col.value] = this.filters[col.value]; 
      });      
      
      let params: URLSearchParams = new URLSearchParams();
      params.set('filters', JSON.stringify(lazyFilters));
  
      return this.http.get(this.jsonURL, {withCredentials: true, search: params})
                  .toPromise()
                  .then(res => { 
                      if(res.json() == "error") {
                          return null;
                      }
                      else
                          return <Fila[]> res.json();
                  })
                  .then(data => { return data; });
  }
  
  // Agrupa sumando!
  groupByAndSum(xs, key, val) {
      return xs.reduce((rv, x) => {
        rv[x[key]] = rv[x[key]] || 0;
        rv[x[key]] = parseFloat(rv[x[key]]) + parseFloat(x[val]);
        return rv;
      }, {});
    };

      

  debounce(func, wait, immediate) : any {    
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  };

  
  onMultiselectChange(event, col) {     
      if(this.loading) return;
      
      this.filters[col] = event;
      
      this.checkLazyLoad(col);
  }
    
  onDateDesdeChange(event, col) {
      if(this.loading) return;
      
      this.msgs.push({severity:'info', summary:'dsd', detail:''});  
      if(typeof event === "object")
          this.filters[col]['desde'] = event.format("YYYYMM");
      else
          this.filters[col]['desde'] = event;
      
      this.checkLazyLoad(col); 
  }
  
  onDateHastaChange(event, col) {
      if(this.loading) return;
      
      this.msgs.push({severity:'info', summary:'hst', detail:''});  
      if(typeof event === "object")
          this.filters[col]['hasta'] = event.format("YYYYMM");
      else
          this.filters[col]['hasta'] = event;
      
      this.checkLazyLoad(col);   
  }
    
  manualFilter(field, value) {
      if(this.loading) return;
      
      this.msgs.push({severity:'info', summary:'mf', detail:''});  
      this.debounce( (field,value) => {
          this.msgs.push({severity:'info', summary:'deb', detail:''});  
          this.filters[field] = value;
          this.checkLazyLoad(field);
      },
          this.debounceTime, false)(field,value);
      //this.agruparChanged(null); 
  }  

  
  showModal(ev, inputNombre) {
      this.msgs.push({severity:'info', summary:'Show', detail:''});   
      inputNombre.focus();
  }
  
  guardarClick() {     
      this.mostrarPopupGuardar = true;
      this.nombreGuardar = this.sidebar.selected ? this.sidebar.selected.nombre + " (modif.)" : "";   
  }
  
  guardarConfirmar() {
      this.msg('info', 'Guardado', '' + this.nombreGuardar);   
      this.mostrarPopupGuardar = false;
            
      let params: URLSearchParams = new URLSearchParams();
      params.set('grid', this.nombreGrid);
      params.set('nombre', this.nombreGuardar);
      params.set('groupby', this.agruparCol);
      params.set('sortby', this.selectedCol);
      params.set('sortbyasc', this.orderAscDesc);
      params.set('ejex', this.chartX);
      params.set('ejey', this.chartY);
      params.set('chart', this.tipoGrafico);
      
      let filtros = JSON.stringify(this.filters);
      params.set('filtros', filtros);
      
      this.http.get(this.backendURL + 'php/userspice/rep_addFavorito.php', {withCredentials: true, search: params})
          .toPromise()
          .then(res => res.json()) // Acá podría devolver OK o error.
          .then(data => { this.sidebar.select({id: data[0].id}, false); return data; });
      
      //this.sidebar.select({id: 1});       
  }
  
  cargarConsultaSeleccionada($event, sidebar) {
      this.msg('info', 'Cargada consulta', ''+sidebar.selected.nombre);
      this.agruparCol = sidebar.selected.groupby;
      this.selectedCol = sidebar.selected.sortby;
      this.orderAscDesc = sidebar.selected.sortbyasc;
      this.chartX = sidebar.selected.ejex;
      this.chartY = sidebar.selected.ejey;        
      this.tipoGrafico = sidebar.selected.chart;      
      
      this.filters = JSON.parse(sidebar.selected.filtros);
      
      this.agruparChanged(null);
      this.refreshChart();
  }
  
  
  onSort(event) {
      this.selectedCol = event.field;
      this.orderAscDesc = event.order;
      let ascdesc =  (event.order == 1 ? "asc." : "desc.");
      //this.msg('info', 'Ordenamiento', 'Por ' + event.field + ', ' + ascdesc);
      
      //this.doSort(event);
      this.agruparChanged(event);
  }
  
  doSort(event) {

      this.filas = this.sortBy(this.filas, event.field, event.order);
      this.msg('info', 'Ordenamiento', this.filas[0][event.field]);
  }
  
  sortBy(filas, field, order) {

      if(this.colsMetadata[field] && this.colsMetadata[field] .orden == "numerico") {
          if(order == 1)
              filas.sort((a,b) => {return a[field] - b[field];});
          else
              filas.sort((a,b) => {return b[field] - a[field];});
      }
      else if(this.colsMetadata[field] && this.colsMetadata[field] .orden == "alfabetico") {
          if(order == 1)
              filas.sort((a,b) => {return a[field] > b[field] ? 1 : -1;});
          else
              filas.sort((a,b) => {return b[field] > a[field] ? 1 : -1;});
      }
      else { // Default
          if(order == 1)
              filas.sort((a,b) => {return a[field] > b[field] ? 1 : -1;});
          else
              filas.sort((a,b) => {return b[field] > a[field] ? 1 : -1;});
      }
      
      return filas;
  }
  
  onClick(dt: DataTable) {
      this.msgs.push({severity:'info', summary:'dt', detail:''});
  }

  show() {
      this.msgs.push({severity:'info', summary:'Info', detail:'' + this.selectedCol});
  }
  
  hide() {
      this.msgs = [];
  }
  
  getStyle(col) {
      return this.colsMetadata[col].orden == "numerico" ? {'text-align' : 'right'} : {};
  }
  


  // AUX   

  values(o) { return Object.keys(o).map(function(k){return o[k]}) }

  groupBy<T>(list:T[], func:(x:T)=>string): Group<T>[] {
      let res:Group<T>[] = [];
      let group:Group<T> = null;
      list.forEach((o)=>{
          let groupName = func(o);
          if (group === null) {
              group = new Group<T>(groupName);
          }
          if (groupName != group.key) {
              res.push(group);
              group = new Group<T>(groupName);
          }
          group.members.push(o)
      });
      if (group != null) {
          res.push(group);
      }
      return res
  }

  exact(s1:any, s2:any) : boolean {
      return s1 == s2;        
  }

}



export class Group<T> {
    key:string;
    members:T[] = [];
    constructor(key:string) {
        this.key = key;
    }
}


export interface Fila {

}
