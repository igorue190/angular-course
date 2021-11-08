import { FormBuilder} from '@angular/forms';
import { of } from 'rxjs';
import { FormUserData, FormGroupName, Users } from 'src/app/model/mock-users';

import { RfRegistrationComponent } from './rf-registration.component';

describe('RfRegistrationComponent', () => {
  
  let component: RfRegistrationComponent;
  let mockRegistrationService;
  let mockFormValidationService;
  let dialogRefSpyObj;
  let USERS;

  beforeEach(() => {
    mockRegistrationService = jasmine.createSpyObj(['addUser', 'getUser']);
    mockFormValidationService = jasmine.createSpyObj(['validateForm']);
    dialogRefSpyObj = jasmine.createSpyObj(['open']);
   USERS = [
      {Id: 0, UserName: 'Igor', Email: 'igor@gmail.com', Gender: 'Genders', FirstName: 'Igor', LastName: 'Nesterenko', Password:'123456', Country: 'Ukraine', City: 'Kharkov', ZipCode: '67000'},
      {Id: 1, UserName: 'Alex', Email: 'alex@gmail.com', Gender: 'Genders', FirstName: 'Alex', LastName: 'Pain', Password:'246810', Country: 'Ukraine', City: 'Kharkov', ZipCode: '67000'},
      {Id: 2, UserName: 'Serg', Email: 'serg@gmail.com', Gender: 'Genders', FirstName: 'Serg', LastName: 'Train', Password:'1357911', Country: 'Ukraine', City: 'Kharkov', ZipCode: '67000'},
      {Id: 3, UserName: 'Peter', Email: 'peter@gmail.com', Gender: 'Genders', FirstName: 'Peter', LastName: 'Game', Password:'654321', Country: 'Ukraine', City: 'Kharkov', ZipCode: '67000'},
      {Id: 4, UserName: 'John', Email: 'john@gmail.com', Gender: 'Genders', FirstName: 'John', LastName: 'rain', Password:'111111', Country: 'Ukraine', City: 'Kharkov', ZipCode: '67000'}
  ]

    component = new RfRegistrationComponent( mockRegistrationService,
                                            mockFormValidationService,
                                            new FormBuilder(),
                                            dialogRefSpyObj)
    component.registerForm = component.buildRegisterFormGroup()
  })

  it('should create RfRegistrationComponent', () => {
    expect(component).toBeTruthy()
  })
  it('should create userName control', () => {
    expect(component.registerForm.contains(FormUserData.userName)).toBeTruthy()
  })
  it('should mark userName as invalid if empty value', () => {
    const userNameControl = component.userNameControl
    userNameControl.setValue('')
    expect(userNameControl.valid).toBeFalsy()
  })
  it('should mark userName as invalid if value minLength less then 4', () => {
    const userNameControl = component.userNameControl
    userNameControl.setValue('012')
    expect(userNameControl.valid).toBeFalsy()
  })
  it('should mark userName as invalid if value maxLength more then 10', () => {
    const userNameControl = component.userNameControl
    userNameControl.setValue('0123456789!')
    expect(userNameControl.valid).toBeFalsy()
  })
  it('should create email control', () => {
    expect(component.registerForm.contains(FormUserData.email)).toBeTruthy()
  })
  it('should mark email as invalid if value not email', () => {
    const emailControl = component.emailControl
    emailControl.setValue('0123456789!')
    expect(emailControl.valid).toBeFalsy()
  })
  it('should create address array', () => {
    expect(component.registerForm.contains(FormGroupName.address)).toBeTruthy()
  })
  it('should create confirmPassword control', () => {
    expect(component.confirmPasswordControl).toBeTruthy()
  })
  it('should mark confirmPassword as invalid if it does not match password', () => {
    const passwordControl = component.passwordControl
    const confirmPasswordControl = component.confirmPasswordControl

    passwordControl.setValue('0123456')
    confirmPasswordControl.setValue('0123456')

    expect(component.confirmPasswordControl.valid).toBeTruthy()
  })
  it('should mark confirmPassword as valid if it match password', () => {
    const passwordControl = component.passwordControl
    const confirmPasswordControl = component.confirmPasswordControl

    passwordControl.setValue('0123456')
    confirmPasswordControl.setValue('01234561')

    expect(component.confirmPasswordControl.valid).toBeFalsy()
  })
  it('should create country control', () => {
    expect(component.countryListControl).toBeTruthy()
  })
  it('should create city control', () => {
    expect(component.cityListControl).toBeTruthy()
  })
  it('should create zipcode control', () => {
    expect(component.zipcodeControl).toBeTruthy()
  })

  //  it('should call submit method', () => {
  //    expect(component.submit()).toHaveBeenCalled()
  //  })

  it('should call getUser method', () => {
    mockRegistrationService.getUser();
    component.getUsers();
    expect(mockRegistrationService.getUser()).toHaveBeenCalled()
  })
});
