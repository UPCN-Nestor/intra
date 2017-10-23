import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';

import {ModulosComponent} from './modulos/modulos.component';
import {HeaderComponent} from './header/header.component';

import { BlockUIModule } from 'ng-block-ui';

import { ConfirmDialogModule, ChartModule, DataTableModule,SharedModule, DataTable, DropdownModule, SelectItem, GrowlModule, Message, CheckboxModule, DragDropModule, MessagesModule,
    PanelModule, InputTextModule, SliderModule, ButtonModule, DialogModule, OverlayPanelModule, MultiSelectModule, ToolbarModule, PasswordModule, DataGridModule, TooltipModule, InputMaskModule,
    DataListModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,   
    ModulosComponent,
    HeaderComponent
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
    InputMaskModule
  ],
  exports: [
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
