import { AbstractControl, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { validateSpanishId} from 'spain-id';

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


    public static checkNifEs(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} |null => {
          if(!control.value) return null
          const valid = validateSpanishId(control.value)
          return !valid ? {nif: {value: control.value}} : null;
        }
      }
    
    
}