import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/mock-users';
import { User } from 'src/app/model/User';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  constructor(private http : HttpClient) { }

  getUser(): User[] {
    return Users;
  }

  addUser(user: User) : Observable<any>{
    Users.push(user);
    return this.http.post('', user);
  }
}
