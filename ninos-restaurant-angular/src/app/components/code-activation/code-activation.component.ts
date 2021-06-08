import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpaceValidator } from 'src/app/model/space-validator';

@Component({
  selector: 'app-code-activation',
  templateUrl: './code-activation.component.html',
  styleUrls: ['./code-activation.component.css']
})
export class CodeActivationComponent implements OnInit {

  checkoutParentGroup: FormGroup
  email: string ="";

  constructor(private formChildGroup: FormBuilder) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem("emailActive");
    this.myFormLogin();
  }


  myFormLogin(){
    this.checkoutParentGroup = this.formChildGroup.group({
      user:this.formChildGroup.group({
        code:new FormControl('',[
          Validators.required,
          SpaceValidator.onlyContainSpace
        ]),

      })
    })
  }

  get code(){
    return this.checkoutParentGroup.get('user.code')
  }

  done(){
    if(this.checkoutParentGroup.invalid){
      this.checkoutParentGroup.markAllAsTouched();
      return;
    }
  }


}
