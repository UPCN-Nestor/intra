
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeaderModule } from 'upcn-header-lib';

import {DpDatePickerModule, IDatePickerConfig} from 'ng2-date-picker';
import { GridComponent } from './reportelib/grid/grid.component';
import { ChartComponent } from './reportelib/chart/chart.component';
import { SidebarComponent } from './reportelib/sidebar/sidebar.component';

import { BlockUIModule } from 'ng-block-ui';

import { InputTextareaModule, ConfirmDialogModule, DataTableModule,SharedModule, DataTable, DropdownModule, SelectItem, GrowlModule, Message, CheckboxModule, DragDropModule, MessagesModule,
    PanelModule, InputTextModule, SliderModule, ButtonModule, DialogModule, OverlayPanelModule, MultiSelectModule, ToolbarModule, PasswordModule, DataGridModule, TooltipModule, InputMaskModule,
    DataListModule, ChartModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ChartComponent,
    SidebarComponent
  ],
  imports: [
    DropdownModule, PanelModule, InputTextareaModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HeaderModule.forRoot(),
    // Para form
    DpDatePickerModule,
    ButtonModule,
    DialogModule,
    BlockUIModule,
    DataListModule,
    DataGridModule,
    MultiSelectModule,
    OverlayPanelModule,
    MessagesModule,
    BrowserModule,
    BrowserAnimationsModule,
    DataTableModule,
    GrowlModule,
    CheckboxModule,
    DragDropModule,
    InputTextModule,
    PasswordModule,
    SliderModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToolbarModule,
    TooltipModule,    
    InputMaskModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
