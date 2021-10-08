import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { RegistrationServiceService } from '../../services/registration-service.service';
import { User } from 'src/app/model/User';
import { UUID } from 'angular2-uuid';
import { countryList } from 'src/app/model/countryList';
import { Observable } from 'rxjs';
import { FormValidationService } from '../../services/form-validation.service';
import { FormGroupName, FormUserData, Genders } from 'src/app/model/mock-users';

@Component({
  selector: 'rf-registration',
  templateUrl: './rf-registration.component.html',
  styleUrls: ['./rf-registration.component.scss']
})
export class RfRegistrationComponent implements OnInit {
  
  registerForm: FormGroup;
  formUserData = FormUserData;
  formGroupName = FormGroupName;

  genders = Genders;
  countries: object[] = countryList;  
  users: User[] = [];
  states: string[] = countryList[0]['states'];

  user: User;
  clicked = false;
  passwordIsValid = false;

  userNameError$: Observable<string>;
  emailError$: Observable<string>;
  firstNameError$: Observable<string>;
  lastNameError$: Observable<string>;
  passwordError$: Observable<string>;
  confirmPasswordError$: Observable<string>;
  zipcodeError$: Observable<string>;

  get userNameControl() : FormControl{
    return this.registerForm.get(this.formUserData.userName) as FormControl;
  }
  get emailControl() : FormControl{
    return this.registerForm.get(this.formUserData.email) as FormControl;
  }
  get firstNameControl() : FormControl{
    return this.registerForm.get(this.formUserData.firstName) as FormControl;
  }
  get lastNameControl() : FormControl{
    return this.registerForm.get(this.formUserData.lastName) as FormControl;
  }
  get genderListControl() : FormControl{
    return this.registerForm.get(this.formUserData.gender) as FormControl;
  }
  get passwordControl() : FormControl{
    return this.registerForm.get(this.formGroupName.passwordGroup).get(this.formUserData.password) as FormControl;
  }
  get confirmPasswordControl() : FormControl{
    return this.registerForm.get(this.formGroupName.passwordGroup).get(this.formUserData.confirmPassword) as FormControl;
  }
  get addressFromArray() : FormArray{
    return this.registerForm.get(this.formGroupName.address) as FormArray;
  }
  get zipcodeControl() : FormControl{
    return this.addressFromArray.controls[0].get(this.formUserData.zipCode) as FormControl;
  }
  get countryListControl() : FormControl{
    return this.addressFromArray.controls[0].get(this.formUserData.country) as FormControl;
  }
  get cityListControl() : FormControl{
    return this.addressFromArray.controls[0].get(this.formUserData.city) as FormControl;
  }

  constructor(private registrationService: RegistrationServiceService,
    private formValidationService: FormValidationService,
    private fb: FormBuilder){
  }

    ngOnInit(): void {
      this.registerForm = this.buildRegisterFormGroup();        
      this.initErrorMessageContainers();
    }

  public buildRegisterFormGroup() : FormGroup {
    return this.fb.group({
      [this.formUserData.userName]: this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      [this.formUserData.email]: this.fb.control('', [Validators.email, Validators.required]),
      [this.formUserData.gender]: this.fb.control(this.genders[0]),
      [this.formUserData.firstName]: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      [this.formUserData.lastName]: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      [this.formGroupName.passwordGroup]: this.fb.group({
        [this.formUserData.password]: this.fb.control(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
        [this.formUserData.confirmPassword]: this.fb.control(null, Validators.required)
      }, {validators: MustMatch(this.formUserData.password,this.formUserData.confirmPassword)}),
      [this.formGroupName.address]: this.fb.array([
          this.buildAddressFormGroup()
      ])
    })
  } 

  private initErrorMessageContainers(){
    this.userNameError$ = this.formValidationService.error$(this.userNameControl);
    this.emailError$ = this.formValidationService.error$(this.emailControl);
    this.firstNameError$ = this.formValidationService.error$(this.firstNameControl);
    this.lastNameError$ = this.formValidationService.error$(this.lastNameControl);
    this.passwordError$ = this.formValidationService.error$(this.passwordControl);
    this.confirmPasswordError$ = this.formValidationService.error$(this.confirmPasswordControl);
    this.zipcodeError$  = this.formValidationService.error$(this.zipcodeControl);
  }

  private buildAddressFormGroup() : FormGroup {
      return this.fb.group({
        [this.formUserData.country]: this.fb.control(this.countries[0][this.formUserData.country]),
        [this.formUserData.city]: this.fb.control(this.states[0]),
        [this.formUserData.zipCode]: this.fb.control('', [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)]),
    });
  }

  submit(){
    console.log("Form submitted: ", this.registerForm);       
    this.createUser()
    if(this.addressFromArray.removeAt(1) !== undefined){
      this.hideShippingAddress();
    }

    this.registerForm.reset();  
    this.setListDataAfterResetForm();
    this.getUsers();
  }

  public createUser() {
    var formModel = this.registerForm.value; 
       this.user = { Id: UUID.UUID(),
        UserName: formModel[this.formUserData.userName], 
        Email: formModel[this.formUserData.email], 
        Gender: formModel[this.formUserData.gender],
        FirstName: formModel[this.formUserData.firstName],
        LastName: formModel[this.formUserData.lastName],
        Password: formModel.passwordGroup[this.formUserData.password],
        Country: formModel.address[0].country,
        City: formModel.address[0].city,
        ZipCode: formModel.address[0].zipcode
    };

    if(formModel.address[1] !== undefined){
        this.user.ShipingCountry = formModel.address[1].country;
        this.user.ShipingCity = formModel.address[1].city;
        this.user.ShipingZipCode = formModel.address[1].zipcode;
    }

    this.registrationService.addUser(this.user);
  }

  private setListDataAfterResetForm(){
    this.genderListControl.setValue(this.genders[0]);
    this.countryListControl.setValue(this.countries[0][this.formUserData.country]);
    this.cityListControl.setValue(this.states[0]);
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
    this.addressFromArray.push(this.buildAddressFormGroup());
  }

  hideShippingAddress(){
    this.addressFromArray.removeAt(1);
  }
}