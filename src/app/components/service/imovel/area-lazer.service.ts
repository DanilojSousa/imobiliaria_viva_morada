import { AreaLazer } from '../../interface/imovel/areaLazer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Paginacao } from '../../interface/imovel/paginacao';
import { Pageable } from '../../interface/imovel/pageable';

@Injectable({
  providedIn: 'root'
})
export class AreaLazerService {
   
  constructor(private http: HttpClient) { }

    getAllPorImvCodigo(imvCodigo: number): Observable<AreaLazer[]> {
      return this.http.get<AreaLazer[]>(environment.api_url_public + "/areaLazer/imovel/"+imvCodigo, { withCredentials: true });
    }

    salvar(areaLazer: AreaLazer): Observable<AreaLazer> {
      return this.http.post<AreaLazer>(environment.api_url + "/areaLazer", areaLazer, { withCredentials: true });
    }

    getAll(): Observable<AreaLazer[]> {
      return this.http.get<AreaLazer[]>(environment.api_url + "/areaLazer", { withCredentials: true });
    }

    getAllPaginado(paginacao:Paginacao): Observable<Pageable<AreaLazer>> {
      return this.http.post<Pageable<AreaLazer>>(environment.api_url + "/areaLazer/filter", paginacao, { withCredentials: true });
    }
    delete(arlCodigo: number) {
      return this.http.delete(environment.api_url + "/areaLazer/"+ arlCodigo, { withCredentials: true });
    }

    getById(arlCodigo: number): Observable<AreaLazer> {
      return this.http.get<AreaLazer>(environment.api_url + "/areaLazer/"+arlCodigo, { withCredentials: true });
    }
}
