import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';

@Directive({
  selector: '[mustMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true}]
})
export class MustMatchDirective implements Validators {
  @Input('mustMatch') mustMatch: string[] = [];
  
  validate(formGroup: FormGroup): ValidationErrors{
    return MustMatch(this.mustMatch[0], this.mustMatch[1])(formGroup);
  }
}
