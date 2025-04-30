import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Util } from '../../utils/util';
import { LoginService } from '../../service/acesso/login.service';


@Injectable({providedIn: 'root'})
export class LogadoOffGuard implements CanActivate{
    constructor(private router: Router,
                private loginService: LoginService) { }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        if(!this.loginService.logado){
          return true;
        }
        this.router.navigate([''])
        return false;
    }
}
