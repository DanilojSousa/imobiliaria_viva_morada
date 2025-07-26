import { Injectable } from '@angular/core';
import { LocalizacaoPraia } from '../../interface/imovel/localizacaoPraia';
import { Pageable } from '../../interface/imovel/pageable';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Paginacao } from '../../interface/imovel/paginacao';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoPraiaService {

  constructor(private http: HttpClient) { }

  salvar(localizacaoPraia: LocalizacaoPraia): Observable<LocalizacaoPraia>{
    return this.http.post<LocalizacaoPraia>(environment.api_url + "/localizacao", localizacaoPraia, { withCredentials: true });
  }

  getAll(): Observable<LocalizacaoPraia[]> {
    return this.http.get<LocalizacaoPraia[]>(environment.api_url + "/localizacao", { withCredentials: true });
  }
  
  getAllPaginado(paginacao:Paginacao): Observable<Pageable<LocalizacaoPraia>> {
    return this.http.post<Pageable<LocalizacaoPraia>>(environment.api_url + "/localizacao/page", paginacao, { withCredentials: true });
  }
  getById(lcpCodigo: number): Observable<LocalizacaoPraia> {
    return this.http.get<LocalizacaoPraia>(environment.api_url + "/localizacao/"+lcpCodigo, { withCredentials: true });
  }
    delete(lcpCodigo: number) {
      return this.http.delete(environment.api_url + "/localizacao/"+ lcpCodigo, { withCredentials: true });
    }
}
