import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Genders } from 'src/app/model/mock-users';
import { RegisterUser } from 'src/app/model/RegisterUser';
import { User } from 'src/app/model/User';
import { RegistrationServiceService } from '../../services/registration-service.service';

@Component({
  selector: 'td-registration',
  templateUrl: './td-registration.component.html',
  styleUrls: ['./td-registration.component.scss']
})
export class TdRegistrationComponent implements OnInit {

  genders = [Genders[0], Genders[1], Genders[2]];
  model = new RegisterUser('','', this.genders[0],'','','');
  user: User;
  users: User[];
  
  constructor(private registrationService: RegistrationServiceService) {
   }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(JSON.stringify(this.model));

    this.user = {Id: UUID.UUID(),
        UserName: this.model.UserName, 
        Email: this.model.Email, 
        Gender: this.model.Gender,
        FirstName: this.model.FirstName,
        LastName: this.model.LastName,
        Password: this.model.Password};

    this.registrationService.addUser(this.user);
    form.resetForm(); 
    this.model = new RegisterUser('','', this.genders[0],'','','');  
    this.getUsers();  
  }

  getUsers(){
    this.users = this.registrationService.getUser();
    console.log(JSON.stringify(this.users));
  }

  reset(form: NgForm){
    //form.resetForm(); 
    this.model = new RegisterUser('','', this.genders[0],'','',''); 
  }
}
