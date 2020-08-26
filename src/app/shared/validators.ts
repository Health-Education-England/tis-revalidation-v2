import {
  FormGroup,
  ValidatorFn,
  ValidationErrors,
  AbstractControl
} from "@angular/forms";

/**
 * validates two date values
 * @param controlName control validation will be set on
 * @param greaterThanControlName control to check is value is greater tha
 */
export function GreaterThan(
  controlName: string,
  greaterThanControlName: string
): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control: AbstractControl = formGroup.controls[controlName];
    const greaterControl: AbstractControl =
      formGroup.controls[greaterThanControlName];

    if (control.errors && !control.errors.greaterThan) {
      return null;
    }

    const controlDate = new Date(control.value);
    const greaterDate = new Date(greaterControl.value);

    if (controlDate.getTime() < greaterDate.getTime()) {
      control.setErrors({
        greaterThan: true
      });
    } else {
      control.setErrors(null);
    }
  };
}
