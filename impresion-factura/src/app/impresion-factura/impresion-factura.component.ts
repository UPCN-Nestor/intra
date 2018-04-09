import { Component, OnInit, Inject, Injectable, ViewChild, ElementRef, AfterViewInit, Renderer2, ApplicationRef } from '@angular/core';
import {InputMaskModule, InputTextModule} from 'primeng/primeng';
import { environment } from '../../environments/environment';
import {HttpModule, Response, Http, Headers, URLSearchParams} from '@angular/http';
import {OverlayPanelModule, OverlayPanel} from 'primeng/primeng';
import 'rxjs/add/operator/toPromise';
import {DataListModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

const jQuery = require('jquery');
declare var printJS : any;
//declare var jQuery;

@Injectable()
@Component({
  selector: 'app-impresion-factura',
  templateUrl: './impresion-factura.component.html',
  styleUrls: ['./impresion-factura.component.css']
})
export class ImpresionFacturaComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
    
  url_fondo : string;
  url_factura_individual : string;
  url_deuda : string;
  url_socios: string;
  url_suministros : string;
  url_estado_deuda : string;

  loading : boolean; 
      
  facturas : any;
  socios : any; // Posibles socios/sumi a los cuales se refiere el usuario (consulta por nombre o dirección)
  suministros: any;

  paso : number;

  msgs: any[];

  cualFoto : number;

  urlFoto = 'linear-gradient(rgba(220, 220, 220, 0.6), rgba(220, 220, 220, 0.6)), url("https://source.unsplash.com/1920x1080/?nature,';

  constructor(private http : Http, private renderer : Renderer2) { 
          
  }
  
  ngOnInit() {
      this.cualFoto = 0;
      document.body.style.backgroundImage = this.urlFoto + this.cualFoto + '")';
    
      this.loading = false;
      this.msgs = [];
      this.socios = [];
      this.facturas = [];            

      this.paso = 1;
      
      //this.url_fondo = "https://source.unsplash.com/random";
      this.url_deuda = environment.baseUrl + 'php/userspice/factura_getDeuda.php';
      this.url_socios = environment.baseUrl + 'php/userspice/factura_getSocios.php';
      this.url_suministros = environment.baseUrl + 'php/userspice/factura_getSuministros.php';
       
      this.url_factura_individual = environment.baseUrl + 'php/userspice/factura_getFactura.php';
      this.url_estado_deuda =  environment.baseUrl + 'php/userspice/IReport/estadodeuda.php';
      
      this.renderer.addClass(document.body, 'fondo_upc'); 
              
      this.setupKeyboards();
  }
  
  setupKeyboards() {

      jQuery('.ui-keyboard-input').bind('keyboardChange', function(e, keyboard, el){
          var txt = 'Input ID of ' + el.id + ' has the accepted content of ' + el.value;
          alert(txt);
        });
      
      var numLayout = { 'normal': ['{sp:1} 1 2 3 {sp:1} {a}', 
                   '{sp:1} 4 5 6 {sp:1} {b}', 
                   '{sp:1} 7 8 9 {sp:4}', 
                   '{sp:2} 0 {sp:5}'] };
      
      jQuery('#soc_sumi').keyboard({
          usePreview: false,
          layout: 'custom',
          customLayout: { 'normal': ['{sp:1} 1 2 3 {sp:1} {a}', 
                                     '{sp:1} 4 5 6 {sp:1} {b}', 
                                     '{sp:1} 7 8 9 {sp:4}', 
                                     '{sp:2} 0 {sp:5}'] },
          display: { 'accept' : 'Aceptar', 'clear' : 'Borrar' },
          //beforeInsert: this.agregarBarra
      });
      
      jQuery('#dni').keyboard({
          usePreview: false,
          layout: 'custom',
          customLayout: numLayout,
          display: { 'accept' : 'Aceptar', 'clear' : 'Borrar' }
      });
      
      jQuery("#nombre").keyboard({
          usePreview: false,
          layout: 'custom',
          customLayout: { 'normal': ['Q W E R T Y U I O P {sp:1} 1 2 3 {sp:1} {a}', 
                                     '{sp:0.8} A S D F G H J K L Ñ {sp:0.2} 4 5 6 {sp:1} {b}', 
                                     '{sp:1.6} Z X C V B N M {sp:4} 7 8 9 {sp:4}', 
                                     '{sp:1.6} {space} {sp:7.1} 0 {sp:4}'] },
          display: {
             'accept' : 'Aceptar',
             'clear' : 'Borrar'
           }
      });
      
      jQuery("#direccion").keyboard({
          usePreview: false,
          layout: 'custom',
          customLayout: { 'normal': ['Q W E R T Y U I O P {sp:1} 1 2 3 {sp:1} {a}', 
                                     '{sp:0.8} A S D F G H J K L Ñ {sp:0.2} 4 5 6 {sp:1} {b}', 
                                     '{sp:1.6} Z X C V B N M {sp:4} 7 8 9 {sp:4}', 
                                     '{sp:1.6} {space} {sp:7.1} 0 {sp:4}'] },
          display: {
             'accept' : 'Aceptar',
             'clear' : 'Borrar'
           }
      });
  }
  
  
  agregarBarra(event, keyboard, el, txt) {

      var toRet="";
      if(el.value.length == 5 && keyboard.last.key != "bksp")
          toRet = "/";
      
      return toRet + txt;
  }
  

  imprimir(letra, pto, numero, servicio) {

      this.blockUI.start('Preparando impresión...');
      
      let params: URLSearchParams = new URLSearchParams();
      params.set('letra', letra);
      params.set('pto', pto);
      params.set('numero', numero);
      params.set('servicio', servicio);

      // Pide al servidor que descargue el PDF generado (para evitar problemas de cross origin)
      this.http.get(this.url_factura_individual, {withCredentials: true, search: params}) 
          .toPromise()
          .then(data => {
              try {
                  //printJS(environment.clientUrl + "intra/src/app/autoservicio/impresion-factura/fact_mensual_B-0-7906179.pdf");
                  printJS(environment.baseUrl + "php/userspice/facturas/fact_mensual_" + letra + "-" + pto + "-" + numero + ".pdf");  
                  this.blockUI.stop();
                  this.blockUI.start("Imprimiendo factura " + letra + "-" + numero + ". Por favor espere.");
                  setTimeout(() => {
                      this.blockUI.stop();
                  }, 12000);
                  
                  //this.msgs.push({severity:'info', summary:'Éxito', detail:"La factura " + letra + "-" + numero + " se está imprimiendo."});
              }
              catch(e) {
                  this.msgs.push({severity:'error', summary:'Error', detail:'No se pudo imprimir la factura ' + letra + "-" + numero + "."});
                  this.blockUI.stop();
              }
          });       
  }
     


  imprimirEstadoDeuda(socio, suministro) {
    
    this.blockUI.start('Preparando impresión...');
    
    let params: URLSearchParams = new URLSearchParams();
    params.set('socio', socio);
    params.set('suministro', suministro);
   
    // Pide al servidor que descargue el PDF generado (para evitar problemas de cross origin)
    this.http.get(this.url_estado_deuda, {withCredentials: true, search: params}) 
        .toPromise()
        .then(data => {
            try {
                //printJS(environment.clientUrl + "intra/src/app/autoservicio/impresion-factura/fact_mensual_B-0-7906179.pdf");
                printJS(environment.baseUrl + "php/userspice/IReport/report/pdf/estado_deuda_" + socio + "-" + suministro + ".pdf");  
                this.blockUI.stop();
                this.blockUI.start("Imprimiendo estado de deuda de socio/suministro " + socio + "/" + suministro + ". Por favor espere.");
                setTimeout(() => {
                    this.blockUI.stop();
                }, 12000);            
            }
            catch(e) {
                this.msgs.push({severity:'error', summary:'Error', detail:"No se pudo imprimir el estado de deuda del socio/suministro " + socio + "/" + suministro + "."});
                this.blockUI.stop();
            }
        });   

  }
      
  
  seleccionarSocio(numero) {

      let params: URLSearchParams = new URLSearchParams();
      params.set('socio', numero);
      params.set('sumi', "0");      
      params.set('dni', "0");   
      params.set('nombre', "0");   
      
      this.http.get(this.url_suministros, {withCredentials: true, search: params}) 
          .toPromise()
          .then(res => { 
              if(res.json() == "error") 
                  return null;              
              else
                  return res.json();
              })
          .then(data => { this.suministros = data; this.paso = 25; this.checkNoResults(); });    
  }
  
  seleccionarSuministro(soc, sumi) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('socio', soc);
    params.set('sumi', sumi);      
    params.set('dni', "0");   
    params.set('nombre', "0");   

    this.http.get(this.url_deuda, {withCredentials: true, search: params}) 
        .toPromise()
        .then(res => { 
            if(res.json() == "error") 
                return null;              
            else
                return res.json();
            })
        .then(data => { this.facturas = data; this.paso = 3; this.checkNoResults(); });    
  }


  @ViewChild('soc_sumi') ss:ElementRef;
  @ViewChild('dni') dni:ElementRef;
  @ViewChild('nombre') nombre:ElementRef;
  @ViewChild('direccion') direccion:ElementRef;
  @ViewChild('op') panel:OverlayPanel;
  
  ngAfterViewInit() {
    jQuery(this.ss.nativeElement).on('change', (e) => {
      this.socSumiChange(e);
    });
    jQuery(this.dni.nativeElement).on('change', (e) => {
        this.dniChange(e);
      });
    jQuery(this.nombre.nativeElement).on('change', (e) => {
        this.nombreChange(e);
      });
    jQuery(this.direccion.nativeElement).on('change', (e) => {
        this.direccionChange(e);
      });
  }
  
  
  nombreChange(e) {
   
      var nom = this.nombre.nativeElement.value;
      
      if(nom=="") return;

      let params: URLSearchParams = new URLSearchParams(); 
      params.set('nombre', nom);   
      params.set('calle', "0"); 
      params.set('altura', "0"); 
      
      this.http.get(this.url_socios, {withCredentials: true, search: params}) 
          .toPromise()
          .then(res => { 
              if(res.json() == "error") 
                  return null;              
              else
                  return res.json();
              })
          .then(data => { this.socios = data; this.paso = 2; this.checkNoResults(); });               
  }
  
  
  direccionChange(e) {
      
      var dir = this.direccion.nativeElement.value;
      var calle = dir.substring(0, dir.lastIndexOf(' '));
      var altura = dir.substring(dir.lastIndexOf(' '));
      
      if(dir=="") return;
      
      if(calle.indexOf("DIAG") > -1)
          calle = "DIAG.SAN MARTIN";
      
      let params: URLSearchParams = new URLSearchParams(); 
      params.set('nombre', "0");   
      params.set('calle', calle); 
      params.set('altura', altura); 
      
      this.http.get(this.url_socios, {withCredentials: true, search: params}) 
          .toPromise()
          .then(res => { 
              if(res.json() == "error") 
                  return null;              
              else
                  return res.json();
              })
          .then(data => { this.socios = data; this.paso = 2; this.checkNoResults(); });               
  }
  

  
  socSumiChange(event) {    

      if(this.ss.nativeElement.value=="") return;
      
      var res = this.ss.nativeElement.value.split("/");
      
      let params: URLSearchParams = new URLSearchParams();
      params.set('socio', res[0] ? res[0] : "0");
      params.set('sumi', res[1] ? res[1] : "0");      
      params.set('dni', "0");   
      params.set('nombre', "0");   
      
      this.http.get(this.url_suministros, {withCredentials: true, search: params}) 
          .toPromise()
          .then(res => { 
              if(res.json() == "error") 
                  return null;              
              else
                  return res.json();
              })
          .then(data => { this.suministros = data; this.paso = 25; this.checkNoResults(); });       
  }
   
  
  dniChange(event) {    

      if(this.dni.nativeElement.value=="") return;
      
      let params: URLSearchParams = new URLSearchParams();
      params.set('socio', "0");
      params.set('sumi', "0");      
      params.set('dni', this.dni.nativeElement.value);   
      params.set('nombre', "0");   
      
      this.http.get(this.url_suministros, {withCredentials: true, search: params}) 
          .toPromise()
          .then(res => { 
              if(res.json() == "error") 
                  return null;              
              else
                  return res.json();
              })
          .then(data => { this.suministros = data; this.paso = 25; this.checkNoResults(); });      
  }
  
  
  checkNoResults() {
      
      this.msgs = []; 
      if(this.paso == 2 && this.socios.length == 0) {
          this.restart();
          this.msgs.push({severity:'error', summary:'Advertencia', detail:'No se han encontrado socios con facturas adeudadas con los datos ingresados.'});
      }
      if(this.paso == 25 && this.suministros.length == 0) {
        this.restart();
        this.msgs.push({severity:'error', summary:'Advertencia', detail:'No se han encontrado socios con suministros activos con los datos ingresados.'});
    }
      if(this.paso == 3 && this.facturas.length == 0) {
          this.restart();
          this.msgs.push({severity:'error', summary:'Advertencia', detail:'No se han encontrado facturas adeudadas con los datos ingresados.'});
      }
  }
  
  
  restart() {
    // collection/658265
      this.cualFoto++;
      document.body.style.backgroundImage = this.urlFoto + this.cualFoto + '")';

      this.socios = [];
      this.facturas = [];
      this.ss.nativeElement.value="";
      this.nombre.nativeElement.value="";
      this.dni.nativeElement.value="";
      this.direccion.nativeElement.value="";
      this.paso = 1;
      this.msgs = [];
  }
  
}
