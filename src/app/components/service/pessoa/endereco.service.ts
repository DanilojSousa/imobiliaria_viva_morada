import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnderecoDTO } from '../../interface/pessoa/endereco';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Pageable } from '../../interface/imovel/pageable';
import { Paginacao } from '../../interface/imovel/paginacao';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  constructor(private http: HttpClient) { }

  salvar(endereco: EnderecoDTO): Observable<EnderecoDTO> {
    return this.http.post<EnderecoDTO>(environment.api_url + "/endereco", endereco, { withCredentials: true });
  }

  getAll(): Observable<EnderecoDTO[]> {
    return this.http.get<EnderecoDTO[]>(environment.api_url + "/endereco", { withCredentials: true });
  }

  getAllPorCidCodigo(cidCodigo: number): Observable<EnderecoDTO[]> {
    return this.http.get<EnderecoDTO[]>(environment.api_url + "/endereco/cidade/"+cidCodigo, { withCredentials: true });
  }

  getAllPorImovelAtivo(): Observable<EnderecoDTO[]> {
    return this.http.get<EnderecoDTO[]>(environment.api_url_public + "/endereco/ativo", { withCredentials: true });
  }
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<EnderecoDTO>> {
    return this.http.post<Pageable<EnderecoDTO>>(environment.api_url + "/endereco/page", paginacao, { withCredentials: true })
  }
  getById(endCodigo: number): Observable<EnderecoDTO> {
    return this.http.get<EnderecoDTO>(environment.api_url + "/endereco/"+endCodigo, { withCredentials: true });
  }
  delete(endCodigo: number) {
    return this.http.delete(environment.api_url + "/endereco/"+ endCodigo, { withCredentials: true });
  }
  buscarEnderecoViaCep(endCep: string) {
    return this.http.get<EnderecoDTO>(environment.api_url + "/endereco/cep/"+endCep, { withCredentials: true });
  }
}
