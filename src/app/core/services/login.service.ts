import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { emailOb, FbAuthResponse, userAuth } from 'src/app/model/userAuth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  get token(): string{
    const expDate = new Date(Cookie.get('fb-token-exp'))
    if(new Date() > expDate){
      this.logout();
      return null;
    } 
    const token = Cookie.get('fb-token');
    if(token === ''){
      return null;
    } else {
      return token;
    }
  }

  login(userAuth: userAuth) : Observable<any>{
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, userAuth)
    .pipe(
      tap(this.setToken)
    )
  }

  logout(){
    this.setToken(null);
  }

  sendEmailVerification(email: emailOb): Observable<any>{
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.apiKey}`, email);
  }

  isAuthenticated() : boolean{
    return !!this.token
  }

  private setToken(response: FbAuthResponse | null){
    if(response){
      const expDate = new Date(new Date().getTime() + + response.expiresIn * 1000);
      Cookie.set('fb-token', response.idToken);
      Cookie.set('fb-token-exp', expDate.toString());
    } else{
      Cookie.delete('fb-token');
      Cookie.delete('fb-token-exp');
    }
  }
}
