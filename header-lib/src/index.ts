import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './app/header/header.component';

import {SelectItem} from 'primeng/primeng';
import {InputTextModule, PasswordModule} from 'primeng/primeng';
import {MessagesModule, Message} from 'primeng/primeng';
import {GrowlModule, ButtonModule, ToolbarModule} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
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
    HeaderComponent
  ],
  providers: [],
  bootstrap: [HeaderComponent]
})
export class HeaderModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HeaderModule
    };
  }

}
