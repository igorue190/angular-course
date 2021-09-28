import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Genders } from 'src/app/model/mock-gender';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { RegistrationServiceService } from '../../services/registration-service.service';
import { User } from 'src/app/model/User';
import { UUID } from 'angular2-uuid';
import { countryList } from 'src/app/model/countryList';
import { Observable } from 'rxjs';
import { FormValidationService } from '../../services/form-validation.service';

@Component({
  selector: 'rf-registration',
  templateUrl: './rf-registration.component.html',
  styleUrls: ['./rf-registration.component.scss']
})
export class RfRegistrationComponent implements OnInit {

  registerForm: FormGroup;
  addressGroup: FormGroup;
  genders = [Genders[0], Genders[1], Genders[2]];
  countries: object[] = countryList;
  passwordIsValid = false;
  users: User[] = [];
  user: User;
  address: FormArray;
  states: string[] = countryList.find(x => x.country === "Afghanistan").states;
  clicked = false;

  userNameError$: Observable<string>;
  emailError$: Observable<string>;
  firstNameError$: Observable<string>;
  lastNameError$: Observable<string>;
  passwordError$: Observable<string>;
  confirmPasswordError$: Observable<string>;
  zipcodeError$: Observable<string>;

  get userNameControl() : FormControl{
    return this.registerForm.get('userName') as FormControl;
  }
  get emailControl() : FormControl{
    return this.registerForm.get('email') as FormControl;
  }
  get firstNameControl() : FormControl{
    return this.registerForm.get('firstName') as FormControl;
  }
  get lastNameControl() : FormControl{
    return this.registerForm.get('lastName') as FormControl;
  }
  get passwordControl() : FormControl{
    return this.registerForm.get('passwordGroup').get('password') as FormControl;
  }
  get confirmPasswordControl() : FormControl{
    return this.registerForm.get('passwordGroup').get('confirmPassword') as FormControl;
  }
  get zipcodeControl() : FormControl{
    return this.addressGroup.get('zipcode') as FormControl;
  }

  constructor(private registrationService: RegistrationServiceService,
    private formValidationService: FormValidationService){
 
  }
    ngOnInit(): void {
      this.addressGroup = new FormGroup({
        country: new FormControl(this.countries[0]['country']),
        city: new FormControl(this.states[0]),
        zipcode: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)])
      });
      
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
          this.addressGroup
          ])
        })       

      this.address = this.registerForm.get('address') as FormArray; 

      this.userNameError$ = this.formValidationService.error$(this.userNameControl);
      this.emailError$ = this.formValidationService.error$(this.emailControl);
      this.firstNameError$ = this.formValidationService.error$(this.firstNameControl);
      this.lastNameError$ = this.formValidationService.error$(this.lastNameControl);
      this.passwordError$ = this.formValidationService.error$(this.passwordControl);
      this.confirmPasswordError$ = this.formValidationService.error$(this.confirmPasswordControl);
      this.zipcodeError$  = this.formValidationService.error$(this.zipcodeControl);
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

  addAddress(){
    this.address.push(this.addressGroup);
  }

  hideShippingAddress(){
    this.address.removeAt(1);
  }
}