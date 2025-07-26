import { environment } from '../../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../interface/acesso/login';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Util } from '../../utils/util';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) { }

  entrar(login: Login){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(environment.api_url_public + "/auth", JSON.stringify(login), {headers:headers}).pipe(
      tap ((res) =>{
        this.setToken(res.token);
        this.setUsuario(res.role, res.usrLogin, res.usrCodigo);
        
        //this.redirecionar();
      }),
    )
  }


  redirecionar() {
    this.router.navigate(['acesso/sistema/detalhe/dashboard']).then(() => {
      window.location.reload();
    });
  }

  setToken(token: any): void{
    this.cookieService.set('XAuthorization', token, 1, '/');
  }

  setUsuario(role: any, usrLogin: any, usrCodigo: any): void{
    this.cookieService.set('role', Util.encode(role))
    this.cookieService.set('user', Util.encode(usrLogin))
    this.cookieService.set('codUser', Util.encode(usrCodigo))
  }
}
