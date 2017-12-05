import { ChartComponent } from './reportes/chart/chart.component';
import { ConsumosComponent } from './reportes/consumos/consumos.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule} from '@angular/common';
import { AppComponent } from './app.component';
import { GridModule } from 'upcn-reporte-lib';

import {DpDatePickerModule} from 'ng2-date-picker';


import { BlockUIModule } from 'ng-block-ui';

import { ConfirmDialogModule, DataTableModule,SharedModule, DataTable, DropdownModule, SelectItem, GrowlModule, Message, CheckboxModule, DragDropModule, MessagesModule,
    PanelModule, InputTextModule, SliderModule, ButtonModule, DialogModule, OverlayPanelModule, MultiSelectModule, ToolbarModule, PasswordModule, DataGridModule, TooltipModule, InputMaskModule,
    DataListModule, ChartModule, PaginatorModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ConsumosComponent    
  ],
  imports: [
    GridModule.forRoot(),
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
    InputMaskModule,
    ChartModule,
    DpDatePickerModule,
    PaginatorModule,
    CommonModule
  ],
  exports: [
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
