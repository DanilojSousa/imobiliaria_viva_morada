import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnderecoDTO } from '../../interface/pessoa/endereco';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Pageable } from '../../interface/produto/pageable';
import { Paginacao } from '../../interface/produto/paginacao';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  salvar(endereco: EnderecoDTO): Observable<EnderecoDTO> {
    return this.http.post<EnderecoDTO>(environment.api_url + "/endereco/salvar", endereco, { withCredentials: true });
  }

  getAll(): Observable<EnderecoDTO[]> {
    return this.http.get<EnderecoDTO[]>(environment.api_url + "/endereco/getAll", { withCredentials: true });
  }

  getAllPorCidCodigo(cidCodigo: number): Observable<EnderecoDTO[]> {
    return this.http.get<EnderecoDTO[]>(environment.api_url + "/endereco/getAllPorCidCodigo?cidCodigo="+cidCodigo, { withCredentials: true });
  }

  getAllPorImovelAtivo(): Observable<EnderecoDTO[]> {
    return this.http.get<EnderecoDTO[]>(environment.api_url_public + "/endereco/getAllPorImovelAtivo", { withCredentials: true });
  }
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<EnderecoDTO>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // Garantir que o tipo de conteúdo seja JSON
    });
    return this.http.post<Pageable<EnderecoDTO>>(environment.api_url + "/endereco/getAllPaginado", paginacao, { headers, withCredentials: true })
  }
  getById(endCodigo: number): Observable<EnderecoDTO> {
    return this.http.get<EnderecoDTO>(environment.api_url + "/endereco/getById?endCodigo="+endCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
  delete(endCodigo: number) {
    return this.http.delete(environment.api_url + "/endereco/delete?endCodigo="+ endCodigo, { withCredentials: true }).pipe(
      map((obj) => obj),
    );
  }
}
