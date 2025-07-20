import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, delay, first, map } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Empresa } from '../../interface/geral/empresa';
import { HttpClient } from '@angular/common/http';
import { Mensagem } from '../../utils/mensagem';
import { Paginacao } from '../../interface/imovel/paginacao';
import { Pageable } from '../../interface/imovel/pageable';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
 
  constructor(private http: HttpClient,
              private mensagem: Mensagem) { }

  salvar(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(environment.api_url + "/empresa", empresa, { withCredentials: true });
  }

  delete(empCodigo: number){
    return this.http.delete(environment.api_url + "/empresa/" + empCodigo, { withCredentials: true });
  }

  getAll(): Observable<Empresa[]>{
    return this.http.get<Empresa[]>(environment.api_url + "/empresa", { withCredentials: true });
  }

  getById(empCodigo: number): Observable<Empresa>{
    return this.http.get<Empresa>(environment.api_url_public + "/empresa/"+empCodigo, { withCredentials: true });
  }

  selecionarAtivo(): Observable<Empresa>{
    return this.http.get<Empresa>(environment.api_url_public + "/empresa/ativo", { withCredentials: true });
  }

  getAllPaginado(paginacao:Paginacao): Observable<Pageable<Empresa>> {
    return this.http.post<Pageable<Empresa>>(environment.api_url + "/empresa/filter", paginacao, { withCredentials: true })
  }

  desativar(empCodigo: number) {
    return this.http.put(environment.api_url + "/empresa/desativar/"+empCodigo, { withCredentials: true });
  }
  getByAtivo(): Observable<Empresa>{
    return this.http.get<Empresa>(environment.api_url_public + "/empresa/ativo", { withCredentials: true });
  }
}
