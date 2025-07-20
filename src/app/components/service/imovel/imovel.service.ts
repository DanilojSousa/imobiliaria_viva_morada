import { Injectable } from '@angular/core';
import { Imovel } from '../../interface/imovel/imovel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PesquisaFiltradaImovel } from '../../interface/imovel/pesquisaFiltradaImovel';
import { environment } from '../../../../environments/environment.prod';
import { ImovelCard } from '../../interface/imovel/imovel-card';
import { Pageable } from '../../interface/imovel/pageable';
import { Paginacao } from '../../interface/imovel/paginacao';
import { ImovelOportunidade } from '../../interface/imovel/imovelOportunidade';
import { ImovelDashboard } from '../../interface/imovel/imovelDashboard';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  constructor(private http: HttpClient) { }

  pesquisaFiltrada(pesquisa: PesquisaFiltradaImovel): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url_public + "/imovel", pesquisa, { withCredentials: true });
  }
  pesquisaFiltradaDetalhes(pesquisa: PesquisaFiltradaImovel): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url + "/imovel/detalhes", pesquisa, { withCredentials: true });
  }
  getAllLancamento(): Observable<ImovelCard[]> {
    return this.http.get<ImovelCard[]>(environment.api_url_public + "/imovel/lancamento", { withCredentials: true });
  }
  getAllCard(page:Paginacao): Observable<ImovelCard[]> {
    return this.http.post<ImovelCard[]>(environment.api_url_public + "/imovel/card", page, { withCredentials: true });
  }
  salvar(imovel: Imovel): Observable<Imovel> {
    return this.http.post<Imovel>(environment.api_url + "/imovel", imovel, { withCredentials: true });
  }
  getById(imvCodigo: number): Observable<Imovel> {
    return this.http.get<Imovel>(environment.api_url_public + "/imovel/"+imvCodigo, { withCredentials: true });
  }
 
  getAllOportunidade(page:Paginacao): Observable<ImovelOportunidade[]> {
    return this.http.post<ImovelOportunidade[]>(environment.api_url_public + "/imovel/oportunidade", page, { withCredentials: true });
  }

  delete(imvCodigo: number) {
    return this.http.delete(environment.api_url + "/imovel/"+imvCodigo, { withCredentials: true });
  }
  desativar(imvCodigo: number) {
    return this.http.post(environment.api_url + "/imovel/desativar/"+imvCodigo, { withCredentials: true });
  }
  atualizaVisualizacao(imvCodigo: number) {
    return this.http.post(environment.api_url_public + "/imovel/visualizacao/"+imvCodigo, { withCredentials: true });
  }
  atualizaFavorito(imovel: Imovel) {
    return this.http.post(environment.api_url_public + "/imovel/favorito", imovel, { withCredentials: true });
  }
  atualizaCompartilhamento(imvCodigo: number) {
    return this.http.post(environment.api_url_public + "/imovel/compartilhamento/"+imvCodigo, { withCredentials: true });
  }
  dadosDashboard(): Observable<ImovelDashboard> {
    return this.http.post<ImovelDashboard>(environment.api_url + "/imovel/dashboard", { withCredentials: true });
  }
  pesquisaImovelFavorito(pesquisa: Paginacao): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url + "/imovel/favorito", pesquisa, { withCredentials: true });
  }
  pesquisaImovelCompartilhamento(pesquisa: Paginacao): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url + "/imovel/compartilhamento", pesquisa, { withCredentials: true });
  }
  pesquisaImovelVisualizacao(pesquisa: Paginacao): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url + "/imovel/visualizacao", pesquisa, { withCredentials: true });
  }
  pesquisaImovelAtivo(pesquisa: Paginacao): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url + "/imovel/ativo", pesquisa, { withCredentials: true });
  }
  pesquisaImovelInativo(pesquisa: Paginacao): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url + "/imovel/inativo", pesquisa, { withCredentials: true });
  }
  pesquisaImovelTotal(pesquisa: Paginacao): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url + "/imovel/total", pesquisa, { withCredentials: true });
  }
}
