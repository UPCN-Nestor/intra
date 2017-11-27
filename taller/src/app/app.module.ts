import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeaderModule } from 'upcn-header-lib';
import { GridModule } from 'upcn-reporte-lib';


// Imports para llevar a lib ABM
import { ButtonModule, ToolbarModule } from 'primeng/primeng';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HeaderModule.forRoot(),
    GridModule.forRoot(),
    // Imports para llevar a lib ABM
    ToolbarModule, ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
