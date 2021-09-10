import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Users } from 'src/app/model/mock-users';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  constructor() { }

  getUser(): User[] {
    return Users;
  }

  addUser(user: User){
    Users.push(user);
  }
}
