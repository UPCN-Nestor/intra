webpackJsonp(["main"],{

/***/ "./src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_gendir lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<meta charset=\"utf-8\">\r\n<app-impresion-factura></app-impresion-factura>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("./src/app/app.component.html"),
        styles: [__webpack_require__("./src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__impresion_factura_impresion_factura_component__ = __webpack_require__("./src/app/impresion-factura/impresion-factura.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_block_ui__ = __webpack_require__("./node_modules/ng-block-ui/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_block_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng_block_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser/animations.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__impresion_factura_impresion_factura_component__["a" /* ImpresionFacturaComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_6_ng_block_ui__["BlockUIModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["DataListModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["DataGridModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["MultiSelectModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["OverlayPanelModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["MessagesModule"],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["GrowlModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["CheckboxModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["DragDropModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["PanelModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["InputTextModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["PasswordModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["SliderModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["DialogModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["ConfirmDialogModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["ToolbarModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["TooltipModule"],
            __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["InputMaskModule"]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./src/app/impresion-factura/impresion-factura.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n\r\n.big  {\r\n\tfont-size: 2em;\r\n\ttext-align: center;\r\n}\r\n\r\n.big2 {\r\n\tfont-size: 1.6em;\r\n\ttext-align: center;\r\n\tfont-family: \"Verdana\", Verdana, sans-serif; \t\r\n}\r\n\r\n.big3 {\r\n\tfont-size: 1.2em;\r\n\tpadding: 0px;\r\n\tmargin: 0px;\r\n\ttext-align: center;\r\n\tfont-family: \"Verdana\", Verdana, sans-serif; \t\r\n}\r\n\r\n.small {\r\n\tfont-size: 0.7em;\r\n\tfont-family: \"Verdana\", Verdana, sans-serif; \t\r\n}\r\n\r\n.space {\r\n\tmargin: 12px;\t\r\n}\r\n\r\n.hide {\r\n\tdisplay: none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/impresion-factura/impresion-factura.component.html":
/***/ (function(module, exports) {

module.exports = "<meta charset=\"utf-8\">\r\n\r\n<block-ui>\r\n\r\n<div class=\"big3\"><p-messages [(value)]=\"msgs\"></p-messages></div>\r\n\r\n<div style=\"width: 1000px; margin-top:25px; margin-left:auto; margin-right:auto;\" class=\"{{paso != 1 ? 'hide' : ''}}\">\r\n\r\n\t<p-dataTable emptyMessage=\"\" rowStyleClass=\"rowInvisible\">\r\n\t\t<p-header>\r\n\t\t\t<div class=\"big2\">Ingrese uno de los siguientes datos</div>\r\n\t\t</p-header>\r\n\t\t<ng-template pTemplate=\"emptymessage\">\r\n\t\t\t\r\n\t\t</ng-template>\r\n\t</p-dataTable>\r\n\t\r\n\t<div class=\"space\"></div>\t\r\n\t\r\n\t<div class=\"big\">\r\n\t<input class=\"big\" #soc_sumi id=\"soc_sumi\" size=\"20\" placeholder=\"Socio\" />\r\n\t</div>\r\n\r\n\t<div class=\"space\"></div>\t\r\n\t\r\n\t<div class=\"big\">\r\n\t<input class=\"big\" #dni id=\"dni\" size=\"20\" placeholder=\"D.N.I.\" />\r\n\t</div>\r\n\t\r\n\t<div class=\"space\"></div>\t\r\n\t\r\n\t<div class=\"big\">\r\n\t<input class=\"big\" #nombre id=\"nombre\"  size=\"20\" placeholder=\"Apellido y nombres\" />\r\n\t</div>\r\n\t\r\n\t<div class=\"space\"></div>\t\r\n\t\r\n\t<div class=\"big\">\r\n\t<input class=\"big\" #direccion id=\"direccion\"  size=\"20\" placeholder=\"Domicilio\" />\r\n\t</div>\r\n\t\r\n</div>\r\n\r\n\r\n<div class=\"space\"></div>\t\r\n<div  *ngIf=\"paso != 1\" class=\"big2\">\r\n<button pButton type=\"button\" style=\"height: 128px; width: 128px;\" icon=\"fa-arrow-left fa-3x\" (click)=\"atras()\"></button>\r\n</div>\r\n\r\n<div *ngIf=\"paso == 3\" ui-g>\r\n\r\n\t<div style=\"margin: 25px; background-color:transparent;\">\r\n\t\t<p-dataGrid [value]=\"facturas\" >\r\n\t\t<p-header>\r\n\t\t\t<div class=\"big2\">Seleccione factura a imprimir</div>\r\n\t\t</p-header>\r\n\t\t\t<ng-template let-fact pTemplate=\"item\">\r\n\t\t\t<div style=\"padding:15px;\" class=\"ui-md-3\">\r\n\t\t\t\t<p-panel class=\"big2\" [header]=\"fact.Comp_letra + '-' + fact.Comp_sucur + '-' + fact.Comp_numer + ' / $' + fact.CompSaldo.substring(0, fact.CompSaldo.length - 2).replace('.', ',')\" \r\n\t\t\t\t\t\t[style]=\"{'text-align':'center', 'background-color':(fact.Pagada=='S'?'':'#FFDDDD')}\">\r\n\t\t\t\t\t<div> <button pButton type=\"button\" style=\"height: 128px; width: 128px;\" icon=\"fa-print fa-3x\" (click)=\"imprimir(fact.fecha, fact.cat, fact.numero)\"></button> </div>\t                \r\n\t\t\t\t\t\t<hr class=\"ui-widget-content\" style=\"border-top:0\">\r\n\t\t\t\t\t\t<div class=\"small\">Emisión: {{fact.Comp_fecha}}</div>\r\n\t\t\t\t\t\t<div class=\"small\">Vencimiento: {{fact.Comp_vto1}} {{(fact.Pagada=='S'?'':' (Impaga)')}}</div>\r\n\t\t\t\t</p-panel> \r\n\t\t\t</div>\r\n\t\t</ng-template>\r\n\t\t</p-dataGrid>\r\n\t</div>\r\n</div>\r\n\r\n<div *ngIf=\"paso == 25\" ui-g>\r\n\t<div style=\"margin: 25px; background-color:transparent;\">\r\n\t\t<p-dataGrid [value]=\"suministros\" >\r\n\t\t<p-header>\r\n\t\t\t<div class=\"big2\">Suministros de {{suministros[0].Soc_nombre}}</div>\r\n\t\t</p-header>\r\n\t\t\t<ng-template let-sumi pTemplate=\"item\">\r\n\t\t\t<div style=\"padding:15px\" class=\"ui-md-3\">\r\n\t\t\t\t<p-panel class=\"big2\" [style]=\"{'text-align':'center'}\">\r\n\t\t\t\t\t<p-header>\r\n\t\t\t\t\t\t<span class=\"fa-stack\">\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<span class=\"fa fa-circle-o fa-stack-2x\"></span>\r\n\t\t\t\t\t\t\t <strong class=\"fa-stack-1x\">{{sumi.Sumi_numer}}</strong>\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t<div *ngIf=\"sumi.Impago > 0\">Adeuda ${{sumi.Impago.substring(0, sumi.Impago.length - 2).replace('.', ',')}}</div>\r\n\t\t\t\t\t\t<div *ngIf=\"sumi.Impago == 0\">Sin deuda</div>\r\n\t\t\t\t\t\t<div *ngIf=\"sumi.Servicios % 2 == 0\">Energía <span class=\"fa fa-plug\"></span></div>\r\n\t\t\t\t\t\t<div *ngIf=\"sumi.Servicios % 3 == 0\">Telecomunicaciones <span class=\"fa fa-wifi\"></span></div>\r\n\t\t\t\t\t\t<div *ngIf=\"sumi.Servicios % 5 == 0\">Servicios Sociales <span class=\"fa fa-medkit\"></span></div>\r\n\t\t\t\t\t\t<span style=\"\"></span>\t\t\t\r\n\r\n\t\t\t\t\t</p-header>\r\n\t\t\t\t\t<div> <button pButton type=\"button\" style=\"height: 90px; width: 300px;\" icon=\"fa-list-ul\" label=\"  Comprobantes\" (click)=\"seleccionarSuministro(sumi.Soc_numero, sumi.Sumi_numer)\"></button> </div>\t \r\n\t\t\t\t\t<div> <button pButton type=\"button\" style=\"height: 90px; width: 300px;\" icon=\"fa-print\" label=\"   Estado de deuda\" (click)=\"imprimirEstadoDeuda(sumi.Soc_numero, sumi.Sumi_numer)\"></button> </div>\t                \r\n\t\t\t\t\t\t<hr class=\"ui-widget-content\" style=\"border-top:0\">\r\n\t\t\t\t\t\t<div class=\"small\">Domicilio: {{sumi.Sumi_calle}} {{sumi.Sumi_nroca}} {{(sumi.Sumi_piso == 0 ? \"\" : \" Piso \" + sumi.Sumi_piso)}} {{(sumi.Sumi_depto.trim() == \"\" ? \"\" : \"Depto. \" + sumi.Sumi_depto)}}</div>\r\n\t\t\t\t</p-panel> \r\n\t\t\t</div>\r\n\t\t</ng-template>\r\n\t\t</p-dataGrid>\r\n\t</div>\r\n</div>\r\n\r\n<div *ngIf=\"paso == 2\" style=\"width: 820px; text-align:center; margin-top:50px; margin-left:auto; margin-right:auto;  background-color:transparent;\">\r\n\t\t<p-dataList [value]=\"socios\">\r\n\t\t   <p-header>\r\n\t\t\t   <div class=\"big2\">Seleccione el titular del servicio</div>\r\n\t\t   </p-header>\r\n\t\t   <ng-template let-socio pTemplate=\"item\">\r\n\t\t\t<div  style=\"padding:10px\" >\r\n\t\t\t\t  <div> <input class=\"big\" type=\"button\" style=\"height: 100px; width: 782px;\" \r\n\t\t\t\t\t\t value=\"{{socio.Soc_nombre}}\"\r\n\t\t\t\t\t\t (click)=\"seleccionarSocio(socio.Soc_numero)\"/> \r\n\t\t\t\t  </div>\t                \r\n\t\t\t</div>\r\n\t\t   </ng-template>\r\n\t\t</p-dataList>\r\n</div>\r\n\r\n\r\n\r\n\r\n</block-ui>\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/impresion-factura/impresion-factura.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImpresionFacturaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_block_ui__ = __webpack_require__("./node_modules/ng-block-ui/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_block_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng_block_ui__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var jQuery = __webpack_require__("./node_modules/jquery/dist/jquery.js");
//declare var jQuery;
var ImpresionFacturaComponent = (function () {
    function ImpresionFacturaComponent(http, renderer) {
        this.http = http;
        this.renderer = renderer;
        this.urlFoto = 'linear-gradient(rgba(220, 220, 220, 0.6), rgba(220, 220, 220, 0.6)), url("https://source.unsplash.com/1920x1080/?nature,';
    }
    ImpresionFacturaComponent.prototype.ngOnInit = function () {
        try {
            this.cualFoto = 0;
            document.body.style.backgroundImage = this.urlFoto + this.cualFoto + '")';
            this.loading = false;
            this.msgs = [];
            this.socios = [];
            this.facturas = [];
            this.paso = 1;
            //this.url_fondo = "https://source.unsplash.com/random";
            this.url_deuda = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].baseUrl + 'php/factura_getDeuda.php';
            this.url_socios = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].baseUrl + 'php/factura_getSocios.php';
            this.url_suministros = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].baseUrl + 'php/factura_getSuministros.php';
            this.url_factura_individual = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].baseUrl + 'php/factura_getFactura.php';
            this.url_estado_deuda = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].baseUrl + 'php/factura_getEstadoDeuda.php';
            this.renderer.addClass(document.body, 'fondo_upc');
            this.setupKeyboards();
            this.idleTimer();
        }
        catch (el) {
        }
    };
    ImpresionFacturaComponent.prototype.setupKeyboards = function () {
        jQuery('.ui-keyboard-input').bind('keyboardChange', function (e, keyboard, el) {
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
            display: { 'accept': 'Aceptar', 'clear': 'Borrar' },
        });
        jQuery('#dni').keyboard({
            usePreview: false,
            layout: 'custom',
            customLayout: numLayout,
            display: { 'accept': 'Aceptar', 'clear': 'Borrar' }
        });
        jQuery("#nombre").keyboard({
            usePreview: false,
            layout: 'custom',
            customLayout: { 'normal': ['Q W E R T Y U I O P {sp:1} 1 2 3 {sp:1} {a}',
                    '{sp:0.8} A S D F G H J K L Ñ {sp:0.2} 4 5 6 {sp:1} {b}',
                    '{sp:1.6} Z X C V B N M {sp:4} 7 8 9 {sp:4}',
                    '{sp:1.6} {space} {sp:7.1} 0 {sp:4}'] },
            display: {
                'accept': 'Aceptar',
                'clear': 'Borrar'
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
                'accept': 'Aceptar',
                'clear': 'Borrar'
            }
        });
    };
    ImpresionFacturaComponent.prototype.agregarBarra = function (event, keyboard, el, txt) {
        var toRet = "";
        if (el.value.length == 5 && keyboard.last.key != "bksp")
            toRet = "/";
        return toRet + txt;
    };
    ImpresionFacturaComponent.prototype.imprimir = function (fecha, cat, numero) {
        var _this = this;
        this.blockUI.start('Preparando impresión...');
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('fecha', fecha);
        params.set('cat', cat);
        params.set('numero', numero);
        // Pide al servidor que descargue el PDF generado (para evitar problemas de cross origin)
        this.http.get(this.url_factura_individual, { withCredentials: true, search: params })
            .toPromise()
            .then(function (data) {
            try {
                //printJS(environment.clientUrl + "intra/src/app/autoservicio/impresion-factura/fact_mensual_B-0-7906179.pdf");
                printJS(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].baseUrl + "php/facturas/fact_mensual_" + numero + ".pdf");
                _this.blockUI.stop();
                _this.blockUI.start("Imprimiendo factura " + numero + ". Por favor espere.");
                setTimeout(function () {
                    _this.blockUI.stop();
                }, 6000);
                //this.msgs.push({severity:'info', summary:'Éxito', detail:"La factura " + letra + "-" + numero + " se está imprimiendo."});
            }
            catch (e) {
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo imprimir la factura ' + numero + "." });
                _this.blockUI.stop();
            }
        });
    };
    ImpresionFacturaComponent.prototype.imprimirEstadoDeuda = function (socio, suministro) {
        var _this = this;
        this.blockUI.start('Preparando impresión...');
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('socio', socio);
        params.set('sumi', suministro);
        // Pide al servidor que descargue el PDF generado (para evitar problemas de cross origin)
        this.http.get(this.url_estado_deuda, { withCredentials: true, search: params })
            .toPromise()
            .then(function (data) {
            try {
                var fecha = (new Date()).toISOString().slice(0, 10).replace(/-/g, "");
                //printJS(environment.clientUrl + "intra/src/app/autoservicio/impresion-factura/fact_mensual_B-0-7906179.pdf");
                printJS(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].baseUrl + "php/facturas/estado_deuda_" + socio + "-" + suministro + "-" + fecha + ".pdf");
                _this.blockUI.stop();
                _this.blockUI.start("Imprimiendo estado de deuda de socio/suministro " + socio + "/" + suministro + ". Por favor espere.");
                setTimeout(function () {
                    _this.blockUI.stop();
                }, 12000);
            }
            catch (e) {
                _this.msgs.push({ severity: 'error', summary: 'Error', detail: "No se pudo imprimir el estado de deuda del socio/suministro " + socio + "/" + suministro + "." });
                _this.blockUI.stop();
            }
        });
    };
    ImpresionFacturaComponent.prototype.seleccionarSocio = function (numero) {
        var _this = this;
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('socio', numero);
        params.set('sumi', "0");
        params.set('dni', "0");
        params.set('nombre', "0");
        this.http.get(this.url_suministros, { withCredentials: true, search: params })
            .toPromise()
            .then(function (res) {
            if (res.json() == "error")
                return null;
            else
                return res.json();
        })
            .then(function (data) { _this.suministros = data; _this.paso = 25; _this.checkNoResults(); });
    };
    ImpresionFacturaComponent.prototype.seleccionarSuministro = function (soc, sumi) {
        var _this = this;
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('socio', soc);
        params.set('sumi', sumi);
        params.set('dni', "0");
        params.set('nombre', "0");
        this.http.get(this.url_deuda, { withCredentials: true, search: params })
            .toPromise()
            .then(function (res) {
            if (res.json() == "error")
                return null;
            else
                return res.json();
        })
            .then(function (data) { _this.facturas = data; _this.paso = 3; _this.checkNoResults(); });
    };
    ImpresionFacturaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        jQuery(this.ss.nativeElement).on('change', function (e) {
            _this.socSumiChange(e);
        });
        jQuery(this.dni.nativeElement).on('change', function (e) {
            _this.dniChange(e);
        });
        jQuery(this.nombre.nativeElement).on('change', function (e) {
            _this.nombreChange(e);
        });
        jQuery(this.direccion.nativeElement).on('change', function (e) {
            _this.direccionChange(e);
        });
    };
    ImpresionFacturaComponent.prototype.nombreChange = function (e) {
        var _this = this;
        var nom = this.nombre.nativeElement.value;
        if (nom == "")
            return;
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('nombre', nom);
        params.set('calle', "0");
        params.set('altura', "0");
        params.set('piso', "x");
        params.set('depto', "x");
        this.http.get(this.url_socios, { withCredentials: true, search: params })
            .toPromise()
            .then(function (res) {
            if (res.json() == "error")
                return null;
            else
                return res.json();
        })
            .then(function (data) { _this.socios = data; _this.paso = 2; _this.checkNoResults(); });
    };
    ImpresionFacturaComponent.prototype.direccionChange = function (e) {
        var _this = this;
        var dir = this.direccion.nativeElement.value;
        var partes = dir.split(' ');
        var calle = partes[0];
        calle = calle.replace('-', ' ');
        var altura = partes[1];
        var piso = partes[2] || 'x';
        var depto = partes[3] || 'x';
        if (dir == "")
            return;
        if (calle.indexOf("DIAG") > -1)
            calle = "DIAG.SAN MARTIN";
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('nombre', "0");
        params.set('calle', calle);
        params.set('altura', altura);
        params.set('piso', piso);
        params.set('depto', depto);
        this.http.get(this.url_socios, { withCredentials: true, search: params })
            .toPromise()
            .then(function (res) {
            if (res.json() == "error")
                return null;
            else
                return res.json();
        })
            .then(function (data) { _this.socios = data; _this.paso = 2; _this.checkNoResults(); });
    };
    ImpresionFacturaComponent.prototype.socSumiChange = function (event) {
        var _this = this;
        if (this.ss.nativeElement.value == "")
            return;
        var res = this.ss.nativeElement.value.split("/");
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('socio', res[0] ? res[0] : "0");
        params.set('sumi', res[1] ? res[1] : "0");
        params.set('dni', "0");
        params.set('nombre', "0");
        this.http.get(this.url_suministros, { withCredentials: true, search: params })
            .toPromise()
            .then(function (res) {
            if (res.json() == "error")
                return null;
            else
                return res.json();
        })
            .then(function (data) { _this.suministros = data; _this.paso = 25; _this.checkNoResults(); });
    };
    ImpresionFacturaComponent.prototype.dniChange = function (event) {
        var _this = this;
        if (this.dni.nativeElement.value == "")
            return;
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('socio', "0");
        params.set('sumi', "0");
        params.set('dni', this.dni.nativeElement.value);
        params.set('nombre', "0");
        this.http.get(this.url_suministros, { withCredentials: true, search: params })
            .toPromise()
            .then(function (res) {
            if (res.json() == "error")
                return null;
            else
                return res.json();
        })
            .then(function (data) { _this.suministros = data; _this.paso = 25; _this.checkNoResults(); });
    };
    ImpresionFacturaComponent.prototype.checkNoResults = function () {
        this.msgs = [];
        if (this.paso == 2 && this.socios.length == 0) {
            this.restart();
            this.msgs.push({ severity: 'error', summary: 'Advertencia', detail: 'El suministro no tiene facturas recientes.' });
        }
        if (this.paso == 25 && this.suministros.length == 0) {
            this.restart();
            this.msgs.push({ severity: 'error', summary: 'Advertencia', detail: 'No hay socios activos con los datos ingresados.' });
        }
        if (this.paso == 3 && this.facturas.length == 0) {
            this.atras();
            this.msgs.push({ severity: 'error', summary: 'Advertencia', detail: 'El suministro no tiene facturas recientes.' });
        }
    };
    ImpresionFacturaComponent.prototype.atras = function () {
        if (this.paso == 2)
            this.paso = 1;
        if (this.paso == 25)
            this.paso = 1;
        if (this.paso == 3)
            this.paso = 25;
        this.msgs = [];
    };
    ImpresionFacturaComponent.prototype.restart = function () {
        // collection/658265
        this.cualFoto++;
        document.body.style.backgroundImage = this.urlFoto + this.cualFoto + '")';
        this.socios = [];
        this.facturas = [];
        this.ss.nativeElement.value = "";
        this.nombre.nativeElement.value = "";
        this.dni.nativeElement.value = "";
        this.direccion.nativeElement.value = "";
        this.paso = 1;
        this.msgs = [];
    };
    // TIMER INACTIVIDAD
    ImpresionFacturaComponent.prototype.idleTimer = function () {
        var t;
        //window.onload = resetTimer;
        window.onmousemove = resetTimer; // catches mouse movements
        window.onmousedown = resetTimer; // catches mouse movements
        window.onclick = resetTimer; // catches mouse clicks
        window.onscroll = resetTimer; // catches scrolling
        window.onkeypress = resetTimer; //catches keyboard actions
        function reload() {
            window.location.href = self.location.href; //Reloads the current page
        }
        function resetTimer() {
            clearTimeout(t);
            t = setTimeout(reload, 300000); // time is in milliseconds (1000 is 1 second)
        }
    };
    return ImpresionFacturaComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5_ng_block_ui__["BlockUI"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_ng_block_ui__["NgBlockUI"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ng_block_ui__["NgBlockUI"]) === "function" && _a || Object)
], ImpresionFacturaComponent.prototype, "blockUI", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('soc_sumi'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], ImpresionFacturaComponent.prototype, "ss", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dni'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _c || Object)
], ImpresionFacturaComponent.prototype, "dni", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('nombre'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _d || Object)
], ImpresionFacturaComponent.prototype, "nombre", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('direccion'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _e || Object)
], ImpresionFacturaComponent.prototype, "direccion", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('op'),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["OverlayPanel"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["OverlayPanel"]) === "function" && _f || Object)
], ImpresionFacturaComponent.prototype, "panel", void 0);
ImpresionFacturaComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-impresion-factura',
        template: __webpack_require__("./src/app/impresion-factura/impresion-factura.component.html"),
        styles: [__webpack_require__("./src/app/impresion-factura/impresion-factura.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]) === "function" && _h || Object])
], ImpresionFacturaComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=impresion-factura.component.js.map

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    /*
    production: false,
    baseUrl: "http://localhost:4200/",
    clientUrl: "http://localhost:4200/",
    */
    // Para prod porque no logro cambiar los environments
    production: true,
    baseUrl: "http://192.168.0.214:8070/",
    clientUrl: "http://192.168.0.214:8070/",
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map