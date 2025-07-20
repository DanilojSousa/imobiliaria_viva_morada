import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../interface/acesso/usuario';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { UsuarioAlterarSenha } from '../../interface/acesso/usuarioAlterarSenha';
import { Pageable } from '../../interface/imovel/pageable';
import { Paginacao } from '../../interface/imovel/paginacao';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.api_url + "/usuario", { withCredentials: true });
  }

  getById(usrCodigo: number): Observable<Usuario>{
    return this.http.get<Usuario>(environment.api_url_public + "/usuario/"+usrCodigo, { withCredentials: true });
  }
  salvar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<any>(environment.api_url + "/usuario", usuario, { withCredentials: true });
  }

  alteraSenha(usuarioAlterarSenha: UsuarioAlterarSenha): Observable<UsuarioAlterarSenha> {
    return this.http.put<any>(environment.api_url_public + "/usuario/senha", usuarioAlterarSenha, { withCredentials: true })
  }
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<Usuario>> {
    return this.http.post<Pageable<Usuario>>(environment.api_url + "/usuario/filter", paginacao, { withCredentials: true });
  }

  delete(usrCodigo: number) {
    return this.http.delete(environment.api_url + "/usuario/"+usrCodigo, { withCredentials: true });
  }
  desativar(usrCodigo: number) {
    return this.http.put(environment.api_url + "/usuario/desativar/"+usrCodigo, { withCredentials: true });
  }
}
