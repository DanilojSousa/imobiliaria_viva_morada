import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, delay, first, map } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Empresa } from '../../interface/geral/empresa';
import { HttpClient } from '@angular/common/http';
import { Mensagem } from '../../utils/mensagem';
import { Paginacao } from '../../interface/produto/paginacao';
import { Pageable } from '../../interface/produto/pageable';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
 
  constructor(private http: HttpClient,
              private mensagem: Mensagem) { }

  cadastrarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(environment.api_url + "/empresa/salvar", empresa, { withCredentials: true });
  }

  excluirEmpresa(id: string){
    const url = environment.api_url + "/empresa/delete/" + id;
    return this.http.delete(url, { withCredentials: true });
  }

  selecionarTodos(): Observable<Empresa[]>{
    return this.http.get<Empresa[]>(environment.api_url + "/empresa/getAll", { withCredentials: true });
  }

  selecionarPorId(empCodigo: number): Observable<Empresa>{
    return this.http.get<Empresa>(environment.api_url + "/empresa/getById?empCodigo="+empCodigo, { withCredentials: true });
  }

  selecionarAtivo(): Observable<Empresa>{
    return this.http.get<Empresa>(environment.api_url_public + "/empresa/getByAtivo", { withCredentials: true });
  }

  getByEmpresa(empCodigo: number): Observable<Empresa>{
    return this.http.get<Empresa>(environment.api_url + "/empresa/getByEmpresaUsuario/"+ empCodigo, { withCredentials: true });
  }

  getAllPaginado(paginacao:Paginacao): Observable<Pageable<Empresa>> {
    return this.http.post<Pageable<Empresa>>(environment.api_url + "/empresa/getAllPaginado", paginacao, { withCredentials: true })
  }

  delete(empCodigo: number) {
    return this.http.delete(environment.api_url + "/empresa/delete?empCodigo="+ empCodigo, { withCredentials: true })
  }
  desativar(empCodigo: number) {
    return this.http.get(environment.api_url + "/empresa/desativar?empCodigo="+empCodigo, { withCredentials: true });
  }

  getAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(environment.api_url + "/empresa/getAll", { withCredentials: true });
  }

  salvar(empresa: Empresa): Observable<Empresa>  {
    return this.http.post<Empresa>(environment.api_url + "/empresa/salvar", empresa, { withCredentials: true });
  }
  getById(empCodigo: string): Observable<Empresa> {
    return this.http.get<Empresa>(environment.api_url + "/empresa/getById?empCodigo="+empCodigo, { withCredentials: true });
  }

  error(e: any): Observable<any>{
    this.mensagem.error("Ocorreu um erro!")
    return EMPTY;
  }
}
