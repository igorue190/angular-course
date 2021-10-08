import { FormBuilder} from '@angular/forms';
import { EMPTY } from 'rxjs';
import { FormUserData, FormGroupName } from 'src/app/model/mock-users';
import { FormValidationService } from '../../services/form-validation.service';
import { RegistrationServiceService } from '../../services/registration-service.service';

import { RfRegistrationComponent } from './rf-registration.component';

describe('RfRegistrationComponent', () => {
  
  let component: RfRegistrationComponent
  let regService : RegistrationServiceService

  beforeEach(() => {
    regService = new RegistrationServiceService(null)
    component = new RfRegistrationComponent( regService,
                                            new FormValidationService(),
                                            new FormBuilder())
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

  it('should call addUser method', () => {
    const spy = spyOn(regService, 'addUser').and.returnValue(EMPTY)
    component.submit()
    expect(spy).toHaveBeenCalled()
  })
  it('should call agetUser method', () => {
    const spy1 = spyOn(regService, 'addUser').and.returnValue(EMPTY)
    const spy2 = spyOn(regService, 'getUser').and.returnValue(component.users)
    component.submit()
    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
  })
});
