import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Genders } from 'src/app/model/mock-gender';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { RegistrationServiceService } from '../../services/registration-service.service';
import { User } from 'src/app/model/User';
import { UUID } from 'angular2-uuid';
import { countryList } from 'src/app/model/countryList';

@Component({
  selector: 'rf-registration',
  templateUrl: './rf-registration.component.html',
  styleUrls: ['./rf-registration.component.scss']
})
export class RfRegistrationComponent implements OnInit {

  registerForm: FormGroup;
  genders = [Genders[0], Genders[1], Genders[2]];
  countries: object[] = countryList;
  passwordIsValid = false;
  users: User[] = [];
  user: User;
  address: FormArray;
  states: string[] = countryList.find(x => x.country === "Afghanistan").states;

  constructor(private registrationService: RegistrationServiceService){
 
  }
    ngOnInit(): void {
      this.registerForm = new FormGroup({
        userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
        email: new FormControl('', [Validators.email, Validators.required]),
        gender: new FormControl(this.genders[0]),
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        passwordGroup: new FormGroup({
          password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
          confirmPassword: new FormControl(null, Validators.required)}, {validators: MustMatch('password','confirmPassword')}),
        address: new FormArray([
          new FormGroup({
            country: new FormControl(this.countries[0]['country']),
            city: new FormControl(this.states[0]),
            zipcode: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)])})
          ])
        })       

      this.address = this.registerForm.get('address') as FormArray; 
    }

  submit(){
    console.log("Form submitted: ", this.registerForm);   
    var formModel = this.registerForm.value; 
       this.user = { Id: UUID.UUID(),
        UserName: formModel['userName'], 
        Email: formModel['email'], 
        Gender: formModel['gender'],
        FirstName: formModel['firstName'],
        LastName: formModel['lastName'],
        Password: formModel.passwordGroup['password'],
        Country: formModel.address[0].country,
        City: formModel.address[0].city,
        ZipCode: formModel.address[0].zipcode};
        this.registrationService.addUser(this.user);
      this.registerForm.reset();  
      this.getUsers();
  }

  getUsers(){
    this.users = this.registrationService.getUser();
    console.log(JSON.stringify(this.users));
  }

  onChangeCountry(value){
    this.states = countryList.find(x => x.country === value).states;
  }

  passwordValid(event){
    if(event){
    this.registerForm.setErrors(this.passwordIsValid = event)
    } else{
      this.registerForm.setErrors(null);
    }
  }
}