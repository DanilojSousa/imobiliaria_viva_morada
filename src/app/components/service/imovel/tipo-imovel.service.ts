import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoImovel } from '../../interface/imovel/tipoImovel';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Pageable } from '../../interface/imovel/pageable';
import { Paginacao } from '../../interface/imovel/paginacao';

@Injectable({
  providedIn: 'root'
})
export class TipoImovelService {
  
  constructor(private http: HttpClient) { }
  
  salvar(tipoImovel: TipoImovel): Observable<TipoImovel>{
    return this.http.post<TipoImovel>(environment.api_url + "/tipoImovel", tipoImovel, { withCredentials: true });
  }

  getAll(): Observable<TipoImovel[]> {
    return this.http.get<TipoImovel[]>(environment.api_url + "/tipoImovel", { withCredentials: true });
  }

  getAllPorImovelAtivo(): Observable<TipoImovel[]> {
    return this.http.get<TipoImovel[]>(environment.api_url_public + "/tipoImovel/ativo",{ withCredentials: true });
  }
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<TipoImovel>> {
      return this.http.post<Pageable<TipoImovel>>(environment.api_url + "/tipoImovel/page", paginacao, { withCredentials: true });
    }
  getById(tpiCodigo: number): Observable<TipoImovel> {
    return this.http.get<TipoImovel>(environment.api_url + "/tipoImovel/"+tpiCodigo, { withCredentials: true });
  }
  delete(tpiCodigo: number) {
    return this.http.delete(environment.api_url + "/tipoImovel/"+ tpiCodigo, { withCredentials: true });
  }
}
