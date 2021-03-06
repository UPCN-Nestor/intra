import { Component, OnInit, Attribute,  ElementRef, Input  } from '@angular/core';
import {HttpModule, Response, Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {SelectItem} from 'primeng/primeng';

import {Router} from '@angular/router';

import {InputTextModule, PasswordModule} from 'primeng/primeng';
import {MessagesModule, Message} from 'primeng/primeng';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    
    user: any;
    username: string = "";
    password: string = "";
    msgs: Message[];
    permissions: any;
    
    @Input() backendURL;

    ocultarEnRutas: string = "/factura"; // Rutas separadas por "/"

    constructor(private http: Http) { 
        this.msgs = [];
    }

    ngOnInit() {

        this.http.get(this.backendURL + 'php/userspice/getLoggedUser.php', {withCredentials: true})
            .toPromise()
            .then(res => {
                this.user = res.json()

                if(this.user) {
                    let params: URLSearchParams = new URLSearchParams();
                    params.set('userId', this.user["id"]);
            
                    this.http.get(this.backendURL + 'php/userspice/getPermissions.php', {withCredentials: true, search: params}).toPromise()
                        .then(res => {
                            this.permissions = res.json();     
                        });
                } else {
                    this.permissions = [];
                };
            });
    }
    
    
    //esOculto() {
    //    return this.r.url != "/" && this.ocultarEnRutas.indexOf(this.r.url) > -1;
    //}  
  
    logout() {
        this.http.get(this.backendURL + 'php/userspice/users/logout.php', {withCredentials: true})
            .toPromise()
            .then(res => { 
                    this.password = "";
                    this.user = null; 
                    window.location.href = "/"; 
                });
    }
    
    login() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('username', this.username);
        params.set('password', this.password);

        this.http.get(this.backendURL + 'php/userspice/users/login_upc.php', {withCredentials: true, search: params})
            .toPromise()
            .then(res => {
                if(res.json() != "error") {        
                    this.user = res.json();
                    this.password = "";
                    //this.msgs.push({severity:'login', summary:'', detail:this.r.url});
                    //let refreshUrl = this.r.url;
                    window.location.reload(false); 
                    //this.r.navigateByUrl("").then(() => this.r.navigateByUrl(refreshUrl));                                     
                } else {
                    this.msgs.push({severity:'error', summary:'', detail:'Usuario o contraseña no válidos'});
                }
            });
            
    }

    home() {
        window.location.href = "/";
        //this.r.navigateByUrl("");
    }
    
}
