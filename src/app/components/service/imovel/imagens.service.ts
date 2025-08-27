import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagens } from '../../interface/imovel/imagens';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImagensService {

  constructor(private http: HttpClient) { }

  getAllPorImvCodigo(imvCodigo: number): Observable<Imagens[]> {
    return this.http.get<Imagens[]>(environment.api_url_public + "/imagens/imovel/"+imvCodigo, { withCredentials: true });
  }
}