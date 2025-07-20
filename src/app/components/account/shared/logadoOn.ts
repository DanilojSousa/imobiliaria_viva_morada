import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import { SessaoService } from '../../service/sessao/sessao.service';


@Injectable({providedIn: 'root'})
export class LogadoOnGuard implements CanActivate{
    constructor(private sessaoService: SessaoService) { }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        if(this.sessaoService.logado()){
          return true;
        }
        return true;
    }
}
