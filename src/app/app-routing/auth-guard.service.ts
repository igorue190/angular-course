import { Injectable, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements OnInit{

  constructor() { }

  ngOnInit(): void {
    Cookie.set('isUserLogged', 'false');
  }

  login(){
    Cookie.set('isUserLogged', 'true');
  }

  logout(){
    Cookie.set('isUserLogged', 'false');
  }
  
  get(): string{
    return Cookie.get('isUserLogged');
  }
}
