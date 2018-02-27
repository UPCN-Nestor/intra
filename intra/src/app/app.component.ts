import { Component, OnInit, Attribute, Renderer, ElementRef  } from '@angular/core';
import {HttpModule, Response, Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {SelectItem} from 'primeng/primeng';
import { environment } from '../environments/environment';

import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';

import {ConsumosComponent} from './reportes/consumos/consumos.component';

import {InputTextModule, PasswordModule} from 'primeng/primeng';
import {MessagesModule, Message} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    title;
  
    constructor(private http: Http, private r : Router) { 
     
    }

    ngOnInit() {

    }
     
}