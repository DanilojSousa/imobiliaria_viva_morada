import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proximidade } from '../../interface/imovel/proximidade';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Paginacao } from '../../interface/imovel/paginacao';
import { Pageable } from '../../interface/imovel/pageable';

@Injectable({
  providedIn: 'root'
})
export class ProximidadeService {

  constructor(private http: HttpClient) { }

  getAllPorImvCodigo(imvCodigo: number): Observable<Proximidade[]> {
    return this.http.get<Proximidade[]>(environment.api_url_public + "/proximidade/imovel/"+imvCodigo, { withCredentials: true });
  }

  salvar(proximidade: Proximidade): Observable<Proximidade> {
    return this.http.post<Proximidade>(environment.api_url + "/proximidade", proximidade, { withCredentials: true });
  }

  getAll(): Observable<Proximidade[]> {
    return this.http.get<Proximidade[]>(environment.api_url + "/proximidade", { withCredentials: true });
  }

  getAllPaginado(paginacao:Paginacao): Observable<Pageable<Proximidade>> {
    return this.http.post<Pageable<Proximidade>>(environment.api_url + "/proximidade/page", paginacao, { withCredentials: true });
  }

  delete(prxCodigo: number) {
    return this.http.delete(environment.api_url + "/proximidade/"+ prxCodigo, { withCredentials: true })
  }

  getById(prxCodigo: number): Observable<Proximidade> {
    return this.http.get<Proximidade>(environment.api_url + "/proximidade/"+prxCodigo, { withCredentials: true });
  }
}
