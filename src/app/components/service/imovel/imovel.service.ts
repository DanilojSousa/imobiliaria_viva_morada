import { Injectable } from '@angular/core';
import { Imovel } from '../../interface/produto/imovel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PesquisaFiltradaImovel } from '../../interface/produto/pesquisaFiltradaImovel';
import { environment } from '../../../../environments/environment.prod';
import { ImovelCard } from '../../interface/produto/imovel-card';
import { Pageable } from '../../interface/produto/pageable';
import { Paginacao } from '../../interface/produto/paginacao';
import { ImovelOportunidade } from '../../interface/produto/imovelOportunidade';


@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  constructor(private http: HttpClient) { }

  pesquisaFiltrada(pesquisa: PesquisaFiltradaImovel): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url_public + "/imovel/getAllFilter", pesquisa);
  }
  getAllLancamento(): Observable<ImovelCard[]> {
    return this.http.get<ImovelCard[]>(environment.api_url_public + "/imovel/getAllLancamento");
  }
  getAllCard(page:Paginacao): Observable<ImovelCard[]> {
    return this.http.post<ImovelCard[]>(environment.api_url_public + "/imovel/getAllCard", page, { withCredentials: true });
  }
  salvar(imovel: Imovel): Observable<Imovel> {
    return this.http.post<Imovel>(environment.api_url + "/imovel/salvar", imovel);
  }
  getById(imvCodigo: number): Observable<Imovel> {
    return this.http.get<Imovel>(environment.api_url_public + "/imovel/getById?imvCodigo="+imvCodigo);
  }
 
  getAllOportunidade(page:Paginacao): Observable<ImovelOportunidade[]> {
    return this.http.post<ImovelOportunidade[]>(environment.api_url_public + "/imovel/getAllOportunidade", page, { withCredentials: true });
  }

  delete(imvCodigo: number) {
    return this.http.delete(environment.api_url + "/imovel/delete?imvCodigo="+imvCodigo, { withCredentials: true });
  }
  desativar(imvCodigo: number) {
    return this.http.get(environment.api_url + "/imovel/desativar?imvCodigo="+imvCodigo, { withCredentials: true });
  }
  getAll(pesquisa: PesquisaFiltradaImovel): Observable<Pageable<Imovel>> {
    return this.http.post<Pageable<Imovel>>(environment.api_url + "/imovel/getAll", pesquisa, { withCredentials: true });
  }

}
