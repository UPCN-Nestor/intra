
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { GridComponent } from './reportes/grid/grid.component';
import { ChartComponent } from './reportes/chart/chart.component';
import { SidebarComponent } from './reportes/sidebar/sidebar.component';

import {DpDatePickerModule} from 'ng2-date-picker';

import {ConsumosComponent} from './reportes/consumos/consumos.component';
import {HeaderComponent} from './header/header.component';

import { BlockUIModule } from 'ng-block-ui';

import { ConfirmDialogModule, DataTableModule,SharedModule, DataTable, DropdownModule, SelectItem, GrowlModule, Message, CheckboxModule, DragDropModule, MessagesModule,
    PanelModule, InputTextModule, SliderModule, ButtonModule, DialogModule, OverlayPanelModule, MultiSelectModule, ToolbarModule, PasswordModule, DataGridModule, TooltipModule, InputMaskModule,
    DataListModule, ChartModule, PaginatorModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbmComponent } from './reportes/abm/abm.component';

@NgModule({
  declarations: [
    AppComponent,   
    ConsumosComponent,
    HeaderComponent,
    SidebarComponent,
    ChartComponent,
    GridComponent,
    AbmComponent
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
    InputMaskModule,
    ChartModule,
    DpDatePickerModule,
    PaginatorModule
  ],
  exports: [
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
