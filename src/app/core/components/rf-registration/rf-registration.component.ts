import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Genders } from 'src/app/model/mock-gender';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { RegistrationServiceService } from '../../services/registration-service.service';
import { User } from 'src/app/model/User';
import { UUID } from 'angular2-uuid';
import { Gender } from 'src/app/model/Gender';

@Component({
  selector: 'rf-registration',
  templateUrl: './rf-registration.component.html',
  styleUrls: ['./rf-registration.component.scss']
})
export class RfRegistrationComponent implements OnInit {

  registerForm: FormGroup
  genders = [Genders[0].Name, Genders[1].Name, Genders[2].Name];
  passwordIsValid = false;
  users: User[] = [];
  user: User;

  constructor(private registrationService: RegistrationServiceService){
 
  }
    ngOnInit(): void {
      this.registerForm = new FormGroup({
        userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
        email: new FormControl('', [Validators.email, Validators.required]),
        gender: new FormControl('Male'),
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
        confirmPassword: new FormControl(null, Validators.required)
        },{validators: MustMatch('password','confirmPassword')       
      })       
    }

  submit(){
    console.log("Form submitted: ", this.registerForm);    
       this.user = new User( UUID.UUID(),
        this.registerForm.get('userName').value, 
        this.registerForm.get('email').value, 
        Genders.find(g => g.Name === this.registerForm.get('gender').value),
        this.registerForm.get('firstName').value,
        this.registerForm.get('lastName').value,
        this.registerForm.get('password').value);
        this.registrationService.addUser(this.user);
      this.registerForm.reset();  
      this.getUsers();
  }

  getUsers(){
    this.users = this.registrationService.getUser();
    console.log(JSON.stringify(this.users));
  }

  passwordValid(event){
    //return this.passwordIsValid = event;
    if(event){
    this.registerForm.setErrors(this.passwordIsValid = event)
    } else{
      this.registerForm.setErrors(null);
    }
  }
}