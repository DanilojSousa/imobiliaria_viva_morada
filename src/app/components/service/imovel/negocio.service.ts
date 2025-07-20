import { Injectable } from '@angular/core';
import { Negocio } from '../../interface/imovel/negocio';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { Paginacao } from '../../interface/imovel/paginacao';
import { Pageable } from '../../interface/imovel/pageable';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  
  constructor(private http: HttpClient) { }
  
  salvar(negocio: Negocio): Observable<Negocio>{
    return this.http.post<Negocio>(environment.api_url + "/negocio", negocio, { withCredentials: true });
  }
  getAll(): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(environment.api_url + "/negocio", { withCredentials: true });
  }

  getAllPorImovelAtivo(): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(environment.api_url_public + "/negocio/ativo", { withCredentials: true });
  }
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<Negocio>> {
    return this.http.post<Pageable<Negocio>>(environment.api_url + "/negocio/page", paginacao, { withCredentials: true });
  }
  getById(ngcCodigo: number): Observable<Negocio> {
    return this.http.get<Negocio>(environment.api_url + "/negocio/"+ngcCodigo, { withCredentials: true });
  }
  delete(ngcCodigo: number) {
    return this.http.delete(environment.api_url + "/negocio/"+ ngcCodigo, { withCredentials: true });
  }
}
