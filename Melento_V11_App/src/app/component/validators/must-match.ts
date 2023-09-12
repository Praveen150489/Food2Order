import { AbstractControl ,ValidatorFn } from "@angular/forms";

export function MustMatch(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null => {
        const password = control.get('pwd');
        const confirmPassword = control.get('confirm_password');

        if(password && confirmPassword && password.value != confirmPassword.value){
            return {'passwordMismatch': true};
        }

        return null;
    };
}