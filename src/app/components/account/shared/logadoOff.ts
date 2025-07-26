import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { SessaoService } from '../../service/sessao/sessao.service';


@Injectable({providedIn: 'root'})
export class LogadoOffGuard implements CanActivate{
    constructor(private router: Router,
                private sessaoService: SessaoService) { }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        if(!this.sessaoService.logado()){
          return true;
        }
        return false;
    }
}
