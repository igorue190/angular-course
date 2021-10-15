import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "src/app/core/services/login.service";

@Injectable({
    providedIn: 'root'
})

export class  LoginGuard implements CanActivate {

    constructor(private loginService: LoginService,
        private router: Router) {      
    }

    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.loginService.token !== null){
            this.router.navigate(['']);
          } else{
            return true;
          }
    }
}