
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeaderModule } from 'upcn-header-lib';
import { GridModule } from 'upcn-reporte-lib';

import { DropdownModule, PanelModule } from 'primeng/primeng';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DropdownModule, PanelModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HeaderModule.forRoot(),
    GridModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
