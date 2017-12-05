import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import {SelectItem} from 'primeng/primeng';
import {InputTextModule, PasswordModule} from 'primeng/primeng';
import {MessagesModule, Message} from 'primeng/primeng';
import {GrowlModule, ButtonModule, ToolbarModule} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    GrowlModule,
    ButtonModule,
    FormsModule,
    ToolbarModule,
    HttpModule
  ],
  exports: [
    HttpModule,
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class HeaderModule { }
