import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Genders } from 'src/app/model/mock-gender';
import { RegisterUser } from 'src/app/model/RegisterUser';
import { User } from 'src/app/model/User';
import { RegistrationServiceService } from '../../services/registration-service.service';

@Component({
  selector: 'td-registration',
  templateUrl: './td-registration.component.html',
  styleUrls: ['./td-registration.component.scss']
})
export class TdRegistrationComponent implements OnInit {

  genders = [Genders[0].Name, Genders[1].Name, Genders[2].Name];
  model = new RegisterUser('','', this.genders[0],'','','','');
  user: User;
  users: User[];
  
  constructor(private registrationService: RegistrationServiceService) {
   }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(JSON.stringify(this.model));

    this.user = new User( UUID.UUID(),
        this.model.UserName, 
        this.model.Email, 
        Genders.find(g => g.Name === this.model.Gender),
        this.model.FirstName,
        this.model.LastName,
        this.model.Password);
        this.registrationService.addUser(this.user);
    form.resetForm(); 
    this.model = new RegisterUser('','', this.genders[0],'','','','');  
    this.getUsers();  
  }

  getUsers(){
    this.users = this.registrationService.getUser();
    console.log(JSON.stringify(this.users));
  }

  reset(form: NgForm){
    form.resetForm(); 
    //this.model = new RegisterUser('','', this.genders[0],'','','',''); 
  }
}
