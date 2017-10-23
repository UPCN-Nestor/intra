import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';

import {ImpresionFacturaComponent} from './impresion-factura/impresion-factura.component';

import { BlockUIModule } from 'ng-block-ui';

import { ConfirmDialogModule, DataTableModule,SharedModule, DataTable, DropdownModule, SelectItem, GrowlModule, Message, CheckboxModule, DragDropModule, MessagesModule,
    PanelModule, InputTextModule, SliderModule, ButtonModule, DialogModule, OverlayPanelModule, MultiSelectModule, ToolbarModule, PasswordModule, DataGridModule, TooltipModule, InputMaskModule,
    DataListModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,   
    ImpresionFacturaComponent
  ],
  imports: [
    BlockUIModule,
    DataListModule,
    DataGridModule,
    MultiSelectModule,
    OverlayPanelModule,
    MessagesModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    DropdownModule,
    GrowlModule,
    CheckboxModule,
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
    InputMaskModule
  ],
  exports: [
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
