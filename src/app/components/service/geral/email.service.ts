import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Email } from '../../interface/geral/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  esqueceuSenha(emaEmail: string){
      return this.http.get(environment.api_url_public + "/email/senha/"+emaEmail, {withCredentials: true});
  }
  enviarEmail(emaEmail: Email){
      return this.http.post(environment.api_url_public + "/email", emaEmail, { withCredentials: true });
  }
}
