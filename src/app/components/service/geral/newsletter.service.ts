import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Newsletter } from '../../interface/geral/newsletter';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }

  salvar(newsletter: Newsletter): Observable<Newsletter> {
    return this.http.post<Newsletter>(environment.api_url_public + "/newsletter", newsletter, { withCredentials: true });
  }

  cancelarInscricao(nwlCodigo: number){
    return this.http.delete(environment.api_url_public + "/newsletter/" + nwlCodigo, { withCredentials: true });
  }
}
