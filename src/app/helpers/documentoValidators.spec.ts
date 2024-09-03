import { FormControl } from '@angular/forms';
import { documentoValidator } from './documentoValidators';

describe('documentoValidator', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl('');
  });

  it('should return null if control value is null or empty', () => {
    control.setValue(null);
    expect(documentoValidator()(control)).toBeNull();

    control.setValue('');
    expect(documentoValidator()(control)).toBeNull();
  });

  it('should return { pattern: true } if control value contains non-numeric characters', () => {
    control.setValue('abc');
    expect(documentoValidator()(control)).toEqual({ pattern: true });

    control.setValue('123abc');
    expect(documentoValidator()(control)).toEqual({ pattern: true });
  });

  it('should return { minlength: true } if control value length is less than 8', () => {
    control.setValue('1234567');
    expect(documentoValidator()(control)).toEqual({ minlength: true });
  });

  it('should return { maxlength: true } if control value length is greater than 11', () => {
    control.setValue('123456789012');
    expect(documentoValidator()(control)).toEqual({ maxlength: true });
  });

  it('should return null if control value length is between 8 and 11 and contains only numeric characters', () => {
    control.setValue('12345678');
    expect(documentoValidator()(control)).toBeNull();

    control.setValue('12345678901');
    expect(documentoValidator()(control)).toBeNull();
  });

  it('should remove dots from the control value before validation', () => {
    control.setValue('123.456.789');
    expect(documentoValidator()(control)).toBeNull();

    control.setValue('123.4567');
    expect(documentoValidator()(control)).toEqual({ minlength: true });

    control.setValue('123.456.789.012');
    expect(documentoValidator()(control)).toEqual({ maxlength: true });
  });
});
