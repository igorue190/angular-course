import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(userNameOrEmail: string, password: string ){
    return true;
  }
}
