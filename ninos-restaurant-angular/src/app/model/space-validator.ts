import { FormControl, ValidationErrors } from '@angular/forms';
export class SpaceValidator {


  static onlyContainSpace(control: FormControl): ValidationErrors{
     if(control.value && control.value.trim().length === 0){
       return {'noSpace': true}
     }else{
       return null;
     }
  }


}


