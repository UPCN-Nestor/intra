import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GridComponent } from './reportes/grid/grid.component';
import { ChartComponent } from './reportes/chart/chart.component';
import { SidebarComponent } from './reportes/sidebar/sidebar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DpDatePickerModule} from 'ng2-date-picker';

import { RouterModule, Routes } from '@angular/router';

import {ConsumosComponent} from './reportes/consumos/consumos.component';
import {ModulosComponent} from './modulos/modulos.component';
import {HeaderComponent} from './header/header.component';
import {ImpresionFacturaComponent} from './autoservicio/impresion-factura/impresion-factura.component';

import { BlockUIModule } from 'ng-block-ui';

import { ConfirmDialogModule, ChartModule, DataTableModule,SharedModule, DataTable, DropdownModule, SelectItem, GrowlModule, Message, CheckboxModule, DragDropModule, MessagesModule,
    PanelModule, InputTextModule, SliderModule, ButtonModule, DialogModule, OverlayPanelModule, MultiSelectModule, ToolbarModule, PasswordModule, DataGridModule, TooltipModule, InputMaskModule,
    DataListModule} from 'primeng/primeng';


const appRoutes: Routes = [                           
                           { path: 'consumos',
                             component: ConsumosComponent
                           },
                           { path: 'factura',
                             component: ImpresionFacturaComponent,
                             data:  { url_fondo: "intra/src/assets/imagenes/fondo_3.jpg" }
                           },
                           { path: '**',
                             component: ModulosComponent                           
                           }                
                         ];


@NgModule({
  declarations: [
    AppComponent,   
    ConsumosComponent,
    GridComponent,
    ChartComponent,
    SidebarComponent,
    ModulosComponent,
    ImpresionFacturaComponent,
    HeaderComponent
  ],
  imports: [
    BlockUIModule,
    DataListModule,
    DataGridModule,
    MultiSelectModule,
    OverlayPanelModule,
    MessagesModule,
    DpDatePickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    DropdownModule,
    GrowlModule,
    CheckboxModule,
    ChartModule,
    DragDropModule,
    PanelModule,
    InputTextModule,
    PasswordModule,
    SliderModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToolbarModule,
    TooltipModule,    
    InputMaskModule,
    RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
          )
  ],
  exports: [
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
