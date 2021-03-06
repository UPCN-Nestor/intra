import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, Injectable, Input, ViewChild, Inject } from '@angular/core';
import {HttpModule, Response, Http, Headers,URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/debounceTime';

import { DataTableModule,SharedModule, DataTable, DropdownModule, SelectItem, GrowlModule, Message, CheckboxModule, DragDropModule, 
    PanelModule, InputTextModule, SliderModule, ButtonModule, DialogModule , OverlayPanelModule, MultiSelectModule, TooltipModule, PaginatorModule} from 'primeng/primeng';
import {ConfirmDialogModule,ConfirmationService,ToggleButtonModule} from 'primeng/primeng';

import { SidebarComponent } from '../sidebar/sidebar.component';

import {DpDatePickerModule, IDatePickerConfig} from 'ng2-date-picker';


import {md5} from './md5';

var timeout = null; // Debe ser global para que funcione el debounce

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [ConfirmationService]
})
export class GridComponent implements OnInit {


  filas : Fila[];
  filasDesagrupado : Fila[]; // "Backup"
 
  filteredValues : Fila[];
  
  @Input() mostrarGrafico : boolean;
  @Input() mostrarSidebar : boolean;

  @ViewChild(SidebarComponent) sidebar:SidebarComponent;
  @Input() nombreGrid = "";
  @Input() tituloGrid = "";
  tituloGridArmado: string;
  @Input() cols : SelectItem[];
  colsParaAgrupar : SelectItem[];
  @Input() colsMetadata : {};
  @Input() jsonURL : string;
  @Input() writeURL : string;						 

  @Input() backendURL : string;
  @Input() userId: string;

  @Input() mostrarAgrupar : boolean;
  @Input() soloConsulta : boolean;

  @Input() selectedCol : string;
  @Input() orderAscDesc = "0";
  agruparCol: string = "";
  
  agrupar : boolean = false;

  accion : number = 0; // Consultar: 0, Nuevo: 1, Editar: 2
  editRow : {};			
  editBackup : {};									   
  totales : {}
  
  @Input() defaultFilters : {}
  filters : any;
  filtrarCol;

  multiselectValues : {};
  
  msgs : Message[] = [];
  
  chartData : any;
  
  tiposGrafico: SelectItem[]; 
  tipoGrafico: string = "";
  chartX : string = "";
  chartY : string = "";
  series : string = "";
 
  datePickerConfig : IDatePickerConfig;
  datePickerConfigMes : IDatePickerConfig;
  datePickerConfigDia : IDatePickerConfig;
  mesesEspanol = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  
  mostrarPopupGuardar = false;
  nombreGuardar = "";
  
  debounceTime = 300;
  
  loading = false; // Para que en la carga inicial los filtros default no activen el refresh lazy.
  
  constructor(private http: Http, private confirmationService: ConfirmationService) { 

  }

  
  ngOnInit() {
            
      this.tituloGridArmado = this.tituloGrid;
      this.loading = true;
      
      this.totales = {};
      this.filters = this.defaultFilters;
      
      this.tipoGrafico = "line";          
  
      this.datePickerConfigMes = { appendTo : "body", format: "YYYY-MM", disableKeypress: true, 
        monthBtnFormatter : m => { return this.mesesEspanol[m.month()] }                                 
        };     
      this.datePickerConfigDia = { appendTo : "body", format: "YYYY-MM-DD", disableKeypress: true, 
                monthBtnFormatter : m => { return this.mesesEspanol[m.month()] }                                 
        };        
      
      this.tiposGrafico =  [
                {value: 'line', label: 'Curvas' },
                  {value: 'bar', label: 'Barras'}
                  
             ];
      
      this.multiselectValues = {};

      // Inicializo multiselects con arrays vacíos
      this.cols.forEach(c => {
        if(this.colsMetadata[c.value].inputFiltro == "multiselect")
            this.multiselectValues[c.value] = [];
        });

      this.getFilas().then(f => { 
          this.filas = f; 
          this.filasDesagrupado = this.filas;

        // Multiselect 2.0, basado en los datos que se traen
          this.cols.forEach(c => {
            this.multiselectValues[c.value] = [];
            if(this.colsMetadata[c.value].inputFiltro == "multiselect") {
                this.filters[c.value]=[];
                let uniques = this.filas.map(f => f[c.value]).filter((x,i,a)=>a.indexOf(x)==i).sort((a:string,b:string)=>{ return a>b ? 1 : -1; });
                uniques.forEach(u => {
                    if(this.multiselectValues[c.value]) 
                        this.multiselectValues[c.value].push({label: u, value: u})
                    else
                        this.multiselectValues[c.value] = [{label: u, value: u}];
                });
            }
            });
                      
          this.inicializarForaneas();		
          this.calculadas();			 
          this.loading = false;
          this.agruparChanged(null);
      });
      
      this.colsParaAgrupar = [{value: '', label: '(Ninguna)' }].concat(this.cols);    

      this.cols.forEach(c => {
          if(this.filters[c.value])
              return;
          
          if(this.colsMetadata[c.value].inputFiltro == "dateRangeMes" || this.colsMetadata[c.value].inputFiltro == "dateRangeDia")              
              this.filters[c.value]={"desde" : "", "hasta" : ""};
              /*
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
          }*/
          else if(this.colsMetadata[c.value].inputFiltro !== "multiselect")
              this.filters[c.value]="";                
      });
         
      //this.agruparChanged(null);
  }
  
  msg(severity, summary, detail)
  {      
      let sev = severity;
      if(severity=="")
          sev = "info";
      this.msgs = [{severity: sev, summary: summary, detail: detail }];
  }
 
  // SIN USO
  getMultiselectValues(col) : any {
      let params: URLSearchParams = new URLSearchParams();
      params.set('campo', col);
  
      return this.http.get(this.colsMetadata[col].multiselectURL, {withCredentials: true, search: params})
        .toPromise();
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

      this.calculadas();

      if(this.agruparCol != "") {      
          //this.msg('', 'Agrupamiento', 'Agrupado por '+this.agruparCol );
        
          this.sortBy(this.agruparCol, 1);
          this.filas = this.groupBy(this.filas, f => f[this.agruparCol]).map(grupo => { 
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
          
          this.sortBy(this.selectedCol, this.orderAscDesc);
      }
      else {
          this.sortBy(this.selectedCol, this.orderAscDesc);
          //this.filas = this.filasDesagrupado;
      }      
      
      this.calcularTotales();      
      //this.reloadChartData();
  }
  
  calcularTotales() {
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
  }

  refreshChart() {
      this.reloadChartData();
  }
  
  reloadChartData() {

      let rows : Fila[];
      if(this.filteredValues)
          rows = this.filteredValues;
      else
          rows = this.filas;
      
      if(!rows)
          return;

      if(!this.series || !this.chartX || !this.chartY) {
        this.chartData = {
            datasets: [],
            labels: []
        };
        return;
      }

      //this.msgs.push({severity:'info', summary:'Gráfico', detail:'Eje X: ' + this.chartX + ', Eje Y: ' + this.chartY });
    
      let displayData = [];
      let ss = this.groupBy(rows.sort((r1,r2)=>{ return r1[this.series] > r2[this.series] ? 1 : -1; }),   // Ordenamiento para que funcione el groupBy
            f => f[this.series]);
      let groupedSeries = ss.map(grupo => { 
        return [grupo, this.groupByAndSum(grupo.members, this.chartX, this.chartY)];
      }); 
      let displayLabels = this.filas.map(f=>f[this.chartX]).filter(function(item, i, ar){ return ar.indexOf(item) === i; })
                .map(x => {
                    let toRet = [];
                    if(this.colsMetadata[this.chartX].fk_mostrar) {
                        toRet.push(this.getMostrarFk(this.chartX, x)); toRet.push(x);
                    } else {
                        toRet.push(x); toRet.push(x);
                    }
                    return toRet;
                })
                .sort((r1,r2)=>{ return r1[1] > r2[1] ? 1 : -1; }); // Eje X

      let seriesData = {};
      groupedSeries.forEach(s => {
        let nombre = s[0].members[0][this.series];
        let vals = displayLabels.map(x => {          
            let ix = x[1];
            return s[1][ix] ? s[1][ix] : 0;
        });    
        seriesData[nombre] = vals;                    
      });

      // *ngIf="colsMetadata[col.value].fk_mostrar">{{getMostrarFk(col.value, fila[col.value])
      this.chartData = {
        datasets: [],
        labels: displayLabels.map(x=>x[0])
      }
      let colors = ["#e6194b","#3cb44b","#ffe119","#0082c8","#f58231","#911eb4","#46f0f0","#f032e6","#d2f53c","#fabebe","#008080","#e6beff","#aa6e28","#fffac8","#800000","#aaffc3","#808000","#ffd8b1","#000080","#808080"];
      let colnum = 0;      
      Object.keys(seriesData).forEach(serie => {
        this.chartData.datasets.push({
            data: seriesData[serie],
            label: this.colsMetadata[this.series].fk_mostrar ? this.getMostrarFk(this.series, serie) : serie,
            backgroundColor: colors[colnum],
            borderColor: colors[colnum], //'#FF4444',
            fill: this.tipoGrafico == 'bar'
        });
        colnum++;
      });
  }
  
  colorsByHash(labels : string[]) {
      return labels.map(str => {
          var stringHexNumber = '#' + md5(str).slice(6, 12);
         
          return stringHexNumber;
      });
  }
  colorByHash(str: string) {
      var stringHexNumber = '#' + md5(str).slice(6, 12);
      return stringHexNumber;
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
          //this.msgs.push({severity:'info', summary:'Lazy loading', detail:''+field});  
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

    /*
  groupBy(xs, key) {
        return xs.reduce((rv, x) => {
          
            if(!rv[key])
                rv[key] = {};
            else
                rv[key].push(rv[x[key]]);
            return rv;  
        }, {});
    }*/


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
 
      if(typeof event === "object")
          this.filters[col]['desde'] = event.format("YYYY-MM-DD");
      else
          this.filters[col]['desde'] = event.length == 7 ? event + "-01" : event;
      
      this.checkLazyLoad(col); 
  }
  
  onDateHastaChange(event, col) {
      if(this.loading) return;
																	  
      if(typeof event === "object")
          this.filters[col]['hasta'] = event.format("YYYY-MM-DD");
      else
          this.filters[col]['hasta'] = event.length == 7 ? event + "-31" : event;
      
      this.checkLazyLoad(col);   
  }
    
  onDateChange(event, col) {
    if(typeof event === "object")
        this.editRow[col] = event.format("YYYY-MM-DD");
    else
        this.editRow[col] = event.length == 7 ? event + "-01" : event;
  }
  
  manualFilter(field, value) {
      if(this.loading) return;
      
      //this.msgs.push({severity:'info', summary:'mf', detail:''});  
      this.debounce( (field,value) => {
          //this.msgs.push({severity:'info', summary:'deb', detail:''});  
          this.filters[field] = value;
          this.checkLazyLoad(field);
      },
          this.debounceTime, false)(field,value);
      //this.agruparChanged(null); 
  }  

  
  showModal(ev, inputNombre) {
      //this.msgs.push({severity:'info', summary:'Show', detail:''});   
      inputNombre.focus();
  }
  
  guardarClick(e) {     
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
      params.set('series', this.series);
      
      let filtros = JSON.stringify(this.filters);
      params.set('filtros', filtros);
      
      this.http.get(this.backendURL + 'php/userspice/rep_addFavorito.php', {	withCredentials: true, search: params})
          .toPromise()
          .then(res => res.json()) // Acá podría devolver OK o error.
          .then(data => { this.sidebar.select({id: data[0].id}, false); return data; });
      
      //this.sidebar.select({id: 1});       
  }
  
  cargarConsultaSeleccionada($event, sidebar) {
      //this.msg('info', 'Cargada consulta', ''+sidebar.selected.nombre);
      this.agruparCol = sidebar.selected.groupby;
      this.selectedCol = sidebar.selected.sortby;
      this.orderAscDesc = sidebar.selected.sortbyasc;
      this.chartX = sidebar.selected.ejex;
      this.chartY = sidebar.selected.ejey;        
      this.tipoGrafico = sidebar.selected.chart;    
      this.tituloGridArmado = this.tituloGrid + ": " + sidebar.selected.nombre;
      this.series = sidebar.selected.series;

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
  
  doSort(event, dt) {
      if(this.filas.length == 0)
        return;   

      this.sortBy(event.field, event.order);
      this.filas = this.filas.slice(0); // ******* HACK REFRESH DATOS DE GRILLA ********
      //this.msg('info', 'Ordenamiento', this.filas[0][event.field]);
  }
  
  sortBy(field, order) {
        
      if(this.colsMetadata[field] && this.colsMetadata[field] .orden == "fk") {
            //this.multiselectValues[field].map()
            if(order == 1)
                this.filas = this.filas.sort((a,b) => {return this.getMostrarFk(field, a[field]) > this.getMostrarFk(field, b[field]) ? 1 : -1;});
            else
                this.filas = this.filas.sort((a,b) => {return this.getMostrarFk(field, b[field]) > this.getMostrarFk(field, a[field]) ? 1 : -1;});
      }
      if(this.colsMetadata[field] && this.colsMetadata[field] .orden == "numerico") {
          if(order == 1)
              this.filas = this.filas.sort((a,b) => {return a[field] - b[field];});
          else
              this.filas = this.filas.sort((a,b) => {return b[field] - a[field];});
      }
      else if(this.colsMetadata[field] && this.colsMetadata[field] .orden == "alfabetico") { 
          if(order == 1)
              this.filas = this.filas.sort((a,b) => {return a[field] > b[field] ? 1 : -1;});
          else
              this.filas = this.filas.sort((a,b) => {return b[field] > a[field] ? 1 : -1;});
      }
      else { // Default
          if(order == 1)
              this.filas = this.filas.sort((a,b) => {return a[field] > b[field] ? 1 : -1;});
          else
              this.filas = this.filas.sort((a,b) => {return b[field] > a[field] ? 1 : -1;});
      }
  }

  getStyle(col) {
    let style = {};
    if (this.colsMetadata[col].orden == "numerico") 
        style['text-align'] = 'right';
    if (this.colsMetadata[col].iconoBoton) 
        style['width'] = '48px';  
    if (this.colsMetadata[col].ancho) 
        style['width'] = this.colsMetadata[col].ancho;  

    return style;
  }

  gridButtonClick(fila, col){
    this.colsMetadata[col.value]["accionBoton"](fila);
  } 

  refreshGrid() {
    this.agruparChanged(null);
  }
  

  resetAgrupar() {
      this.agruparCol="";
      this.agruparChanged(null);
  }

  resetFilters() {
      this.filters={};
      this.cols.forEach(c => {
        if(this.colsMetadata[c.value].inputFiltro == "dateRangeMes" || this.colsMetadata[c.value].inputFiltro == "dateRangeDia")              
            this.filters[c.value]={"desde" : "", "hasta" : ""};
        else
            this.filters[c.value]="";
      });

      this.agruparChanged(null);
  }



  rowClick(e, dt) {

    if(this.soloConsulta)
        return;
    //console.log(dt);
    if(this.agruparCol != "") {
        this.msg('info', 'Info', 'No se puede editar en modo Agrupado');
        return;
    }
    if(this.accion > 0)
        return;
    
    dt.dataToRender.forEach(f=> f.isEditing = false);

    this.editarIniciar(e);
  }

  inicializarForaneas() {
      this.cols.forEach(c => {
          if(this.colsMetadata[c.value].fk_url) {
            this.http.get(this.colsMetadata[c.value].fk_url, {withCredentials: true})
                .toPromise().then(d => {
                    let toRet = [];
                    let mostrar = this.colsMetadata[c.value].fk_mostrar.split(",");
                    d.json().forEach(x => {
                        toRet.push({'value': x.id, 'label': mostrar.length == 1 ? x[mostrar[0]] : mostrar.reduce((m,n) => x[m] + "-" + x[n])})                        
                    });                
                    this.multiselectValues[c.value] = toRet;

                });
          }        
      });
  }

  calculadas() {
    this.cols.forEach(c => {
        if(this.colsMetadata[c.value].calculada) {
            this.filas.forEach(f => {                
                f[c.value] = this.colsMetadata[c.value].calculada(f);
            })            
        }   
    });
  }

  getMostrarFk(col, val) {
    if(!this.multiselectValues[col]) 
        return;
    return this.multiselectValues[col].filter(x=>x.value==val).length > 0 ? this.multiselectValues[col].filter(x=>x.value==val)[0].label : "";
  }


  isObject ( obj ) {
    return obj && (typeof obj  === "object");
  }

  editarNuevo(dt) {
    if(this.agruparCol != "") {
        this.msg('info', 'Info', 'No se puede agregar en modo Agrupado');
        return;
    }

    this.accion = 1;    
    this.editRow = { isEditing:true };

    this.filas =  [ this.editRow, ...this.filas ];
    this.filasDesagrupado =  [ this.editRow, ...this.filasDesagrupado ];

    this.cols.forEach(c=> { // Por defecto la fila nueva tiene el valor del filtro activo en cada columna
        if(this.colsMetadata[c.value]["defaultNew"]) {
            if(this.colsMetadata[c.value]["defaultNew"] == "%hoy%")
                this.editRow[c.value] = new Date().toISOString().substr(0,10);
            else
                this.editRow[c.value] = this.colsMetadata[c.value]["defaultNew"];
        }
        if(this.filters[c.value] instanceof Array && this.filters[c.value].length == 1)
            this.editRow[c.value] = this.filters[c.value][0];
        else if(!this.isObject(this.filters[c.value]))
            this.editRow[c.value] = this.filters[c.value];
    });
  }

  editarIniciar(e) {
    this.editBackup = { ... e.data };
    this.accion = 2;
    this.editRow = e.data;
    e.data.isEditing=true;
  }

  editarAceptar(dt) {
    dt.dataToRender.forEach(f=> f.isEditing = false);

    let params: URLSearchParams = new URLSearchParams();
    this.cols.forEach(c => { 
        if(this.colsMetadata[c.value].calculada === undefined && this.colsMetadata[c.value].accionBoton === undefined)
            params.set(c.value, this.editRow[c.value]);
    });

    if(this.editRow["id"])  // Update
        this.http.put(this.writeURL, params, {withCredentials: true}).toPromise().then(res => {
            //this.msg("info","info","Editado id " + this.editRow["id"]);
            console.log(res);
            if(res.json()[0] == "error") {
                this.editarCancelar(dt);
                this.msg("warn","Error","No se pudo modificar fila en base de datos");
            } else {        
                this.accion = 0;
                this.calculadas();
                this.agruparChanged(null);
            }
        });
    else {        
        this.http.post(this.writeURL, params, {withCredentials: true}).toPromise().then(res => {
            //this.msg("info","info","Nuevo insertado");
            console.log(res);
            if(res.json()[0] == "error") {
                this.editarCancelar(dt);
                this.msg("warn","Error","No se pudo insertar fila en base de datos");
            } else {
                this.editRow["id"] = res.json();
                this.accion = 0;
                this.calculadas();
                this.agruparChanged(null);
            }
        });
    }
  }

  confirm(dt) {
    this.confirmationService.confirm({
        message: '¿Está seguro de que desea eliminar esta fila?',
        accept: () => {
            this.editarEliminar(dt);
        }
    });
  }

  editarEliminar(dt) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', this.editRow["id"]);

    this.http.delete(this.writeURL, {withCredentials: true, search: params})
                .toPromise()
                .then(res => { 
                    console.log(res.json()); 
                    if(res.json() == 1) { // Se borró con éxito
                        this.filas = this.filas.filter(f=>f["id"] != this.editRow["id"]);
                        this.filasDesagrupado = this.filasDesagrupado.filter(f=>f["id"] != this.editRow["id"]);
                        this.accion = 0;
                        this.calcularTotales();
                    }
                    else {
                        this.msg("warn","Error","No se pudo eliminar fila en base de datos. Puede que un dato de otra tabla dependa de este.");
                        this.editarCancelar(dt);
                    }
                });
  }

  editarCancelar(dt) {
    if(this.accion==1) {
        this.filas = this.filas.filter(f=> f["id"]);
        this.filasDesagrupado = this.filasDesagrupado.filter(f=> f["id"]);
    }
    if(this.accion==2) {
        this.filas = this.filas.filter(f => f["id"] != this.editBackup["id"]);
        this.filasDesagrupado = this.filasDesagrupado.filter(f => f["id"] != this.editBackup["id"]);
        this.filas.push({ ... this.editBackup });
        this.filasDesagrupado.push({ ... this.editBackup });
        
        //dt.dataToRender.filter(f => f["id"] == this.editBackup["id"])[0] = { ... this.editBackup };
    }
    this.accion = 0;    
    
    dt.dataToRender.forEach(f=> { 
            f.isEditing = false;        
        });
  }


  getRowStyleClass(data, index) {
      //alert(this.rowStyle());
       
      let toRet = data["isEditing"] ? 'editingRow' : 
        data["isHighlighted"] ? 'highlightedRow' : 'tooltip';

      return toRet;
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
