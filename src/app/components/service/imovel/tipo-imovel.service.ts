import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoImovel } from '../../interface/produto/tipoImovel';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Pageable } from '../../interface/produto/pageable';
import { Paginacao } from '../../interface/produto/paginacao';

@Injectable({
  providedIn: 'root'
})
export class TipoImovelService {
  
  constructor(private http: HttpClient) { }
  
  salvar(tipoImovel: TipoImovel): Observable<TipoImovel>{
    return this.http.post<TipoImovel>(environment.api_url + "/tipoImovel/salvar", tipoImovel, { withCredentials: true });
  }

  getAll(): Observable<TipoImovel[]> {
    return this.http.get<TipoImovel[]>(environment.api_url + "/tipoImovel/getAll", { withCredentials: true });
  }

  getAllPorImovelAtivo(): Observable<TipoImovel[]> {
    return this.http.get<TipoImovel[]>(environment.api_url_public + "/tipoImovel/getAllPorImovelAtivo",{ withCredentials: true });
  }
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<TipoImovel>> {
      return this.http.post<Pageable<TipoImovel>>(environment.api_url + "/tipoImovel/getAllPaginado", paginacao, { withCredentials: true });
    }
  getById(tpiCodigo: number): Observable<TipoImovel> {
    return this.http.get<TipoImovel>(environment.api_url + "/tipoImovel/getById?tpiCodigo="+tpiCodigo, { withCredentials: true });
  }
  delete(tpiCodigo: number) {
    return this.http.delete(environment.api_url + "/tipoImovel/delete?tpiCodigo="+ tpiCodigo, { withCredentials: true });
  }
}
