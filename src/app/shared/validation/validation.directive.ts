import { Directive, Input } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {invalidName: {value: control.value}} : null;
  };
}

@Directive({
  selector: '[nameValidation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidationDirective,
    multi: true
  }]
})

export class ValidationDirective implements Validator {

  @Input('nameValidation') invalidName: string;

  public validate(control:AbstractControl): ValidationErrors | null{
    return this.invalidName ? forbiddenNameValidator(new RegExp(this.invalidName,'i'))(control):null;
  }
}
