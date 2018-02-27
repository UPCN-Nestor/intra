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
    
  imageDir = "intra/src/assets/imagenes/";
  
  constructor(private r: Router) { }

  ngOnInit() {

      this.modulos = [{nombre:'Consumos', path:'consumos', desc: 'Reporte de consumos', img: environment.baseUrl + this.imageDir + "Consumos.png"}, 
                      {nombre:'Impresión de Factura', path:'factura', desc: 'Módulo para reimprimir facturas adeudadas, para utilizar en terminal de autoservicio'}, 
                      {nombre:'Ejemplo link externo', desc: 'Ícono custom', icon: 'fa-external-link'}, 
                      {nombre:'y', desc: 'yy'}, 
                      {nombre:'z', desc: 'zz'}];
      // Cada módulo podría indicar su ícono? Al menos entre fa-sign-in y fa-external-link?
  }

  selectModulo(path) {
      //window.location.href = "/" + path.toLowerCase() + "/index.html";
      this.r.navigateByUrl("/" + path.toLowerCase() + "/index.html");
  }
  
}
