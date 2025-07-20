import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proximidade } from '../../interface/produto/proximidade';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Paginacao } from '../../interface/produto/paginacao';
import { Pageable } from '../../interface/produto/pageable';

@Injectable({
  providedIn: 'root'
})
export class ProximidadeService {

  constructor(private http: HttpClient) { }

  getAllPorImvCodigo(imvCodigo: number): Observable<Proximidade[]> {
    return this.http.get<Proximidade[]>(environment.api_url + "/proximidade/getAllPorImvCodigo?imvCodigo="+imvCodigo, { withCredentials: true });
  }

  salvar(proximidade: Proximidade): Observable<Proximidade> {
    return this.http.post<Proximidade>(environment.api_url + "/proximidade/salvar", proximidade, { withCredentials: true });
  }

  getAll(): Observable<Proximidade[]> {
    return this.http.get<Proximidade[]>(environment.api_url + "/proximidade/getAll", { withCredentials: true });
  }

  getAllPaginado(paginacao:Paginacao): Observable<Pageable<Proximidade>> {
    return this.http.post<Pageable<Proximidade>>(environment.api_url + "/proximidade/getAllPaginado", paginacao, { withCredentials: true });
  }

  delete(prxCodigo: number) {
    return this.http.delete(environment.api_url + "/proximidade/delete?prxCodigo="+ prxCodigo, { withCredentials: true })
  }

  getById(prxCodigo: number): Observable<Proximidade> {
    return this.http.get<Proximidade>(environment.api_url + "/proximidade/getById?prxCodigo="+prxCodigo, { withCredentials: true });
  }
}
