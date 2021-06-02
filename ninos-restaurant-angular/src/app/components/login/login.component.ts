import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/security/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SpaceValidator } from 'src/app/model/space-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkoutParentGroup: FormGroup

  constructor(private formChildGroup: FormBuilder,
              private authenticationService:AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.myFormLogin();
  }

  myFormLogin(){
    this.checkoutParentGroup = this.formChildGroup.group({
      user:this.formChildGroup.group({
        email:new FormControl('',[
          Validators.required,
          SpaceValidator.onlyContainSpace,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        ]),
        password:new FormControl('',[
          Validators.required
        ])
      })
    })
  }


  login(){
    this.authenticationService.executeAuthentication(
      this.checkoutParentGroup.controls['user'].value.email,
      this.checkoutParentGroup.controls['user'].value.password
    ).subscribe({
      next: response =>{
        this.router.navigateByUrl('/orders')
      },
      error: er =>{

      }
    });
  }

  get email(){
    return this.checkoutParentGroup.get('user.email');
  }

  get password(){
    return this.checkoutParentGroup.get('user.password');
  }


}
