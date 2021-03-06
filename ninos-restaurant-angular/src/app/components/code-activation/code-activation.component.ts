import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
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

  constructor(private formChildGroup: FormBuilder, private authenticationService:AuthenticationService, private router:Router) { }

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

    this.authenticationService.activeAccount(this.email, this.checkoutParentGroup.controls['user'].value.code).subscribe({
      next: response =>{
        if(response.result == 1){
          this.router.navigateByUrl("/login")
        }else{
          alert("Invalid Code")
        }
      }
    })


  }


}
