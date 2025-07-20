import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Condominio } from '../../interface/pessoa/condominio';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Paginacao } from '../../interface/imovel/paginacao';
import { Pageable } from '../../interface/imovel/pageable';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Condominio> {
    return this.http.get<Condominio>(environment.api_url + "/condominio/"+id, { withCredentials: true });
  }
  salvar(condominio: Condominio): Observable<Condominio> {
    return this.http.post<Condominio>(environment.api_url + "/condominio",condominio, { withCredentials: true });
  }

  getAllPorEndCodigo(endCodigo: number): Observable<Condominio[]> {
    return this.http.get<Condominio[]>(environment.api_url + "/condominio/endereco/"+endCodigo, { withCredentials: true });
  }
  carregaCondominioPorEnderecos(enderecos: number[]): Observable<Condominio[]> {
    return this.http.post<Condominio[]>(environment.api_url + "/condominio/endereco", enderecos, { withCredentials: true });
  }
  getAllPorImovelAtivo(): Observable<Condominio[]> {
    return this.http.get<Condominio[]>(environment.api_url + "/condominio/ativo", { withCredentials: true });
  }
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<Condominio>> {
    return this.http.post<Pageable<Condominio>>(environment.api_url + "/condominio/page", paginacao, { withCredentials: true });
  }
  delete(conCodigo: number) {
    return this.http.delete(environment.api_url + "/condominio/"+ conCodigo, { withCredentials: true });
  }
}
