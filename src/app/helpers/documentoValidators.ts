import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function documentoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value ? control.value.toString().replace(/\./g, '') : '';

    if (!/^[0-9]*$/.test(value)) {
      return { pattern: true };
    }

    if (value.length === 0) {
      return null;
    }

    if (value.length < 8) {
      return { minlength: true };
    }

    if (value.length > 11) {
      return { maxlength: true };
    }

    return null;
  };
}
