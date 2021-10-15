import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../core/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

constructor(private router: Router,
  private loginService: LoginService){  
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginService.token === null){
        this.router.navigate(['/rfreg']);
      } else{
        return true;
      }
    } 
}
