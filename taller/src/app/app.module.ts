
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeaderModule } from 'upcn-header-lib';
import { GridModule } from 'upcn-reporte-lib';

import { DropdownModule, PanelModule, InputTextareaModule, ButtonModule, DialogModule } from 'primeng/primeng';
import {DpDatePickerModule, IDatePickerConfig} from 'ng2-date-picker';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DropdownModule, PanelModule, InputTextareaModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HeaderModule.forRoot(),
    GridModule.forRoot(),
    // Para form
    DpDatePickerModule,
    ButtonModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
