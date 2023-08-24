import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ConfirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirm_password = control.get('confirm_password');
    
        if (!password || !confirm_password) {
            return null;
        }

        if(password.value !== confirm_password.value)
            confirm_password.setErrors({ 'passwordMismatch': true })
        
        return password.value === confirm_password.value ? null : { 'passwordMismatch': true };
    };
}