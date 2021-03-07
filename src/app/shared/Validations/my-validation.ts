import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export class MyValidation{
    public static maskValidation(mask: RegExp):(ValidatorFn | null | undefined){
        return (control: FormControl):{[key:string]:any} |null =>{
            const invalid = mask.test(control.value);
            return invalid ?  null : { 'wordInvalid': {value:control.value}};
        }
    }

    public static checkPassword(password?:string,passwordConfirm?:string):ValidatorFn{
        return (control:FormGroup):{[key:string]:any} =>{
            const passwordIn= control.controls[password];
            const passwordConfirmIn = control.controls[passwordConfirm];
            if (passwordIn?.touched || passwordConfirmIn?.touched ){
                const isNotMatch= passwordIn.value !==  passwordConfirmIn.value;
                if(isNotMatch && passwordIn.valid && passwordConfirmIn.valid){
                    passwordConfirmIn.setErrors({ extra: passwordConfirm});
                }
            }
            return null;
        };
    }
}