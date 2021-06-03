import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { OrderService } from './../../services/order.service';
import { Order } from './../../model/order';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  constructor(private router: Router, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }


  doSearch(value: string){
     this.router.navigateByUrl(`/orders/${value}`)
  }

  isAuthenticatedUser(){
    return this.authenticationService.isLogin();
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigateByUrl("/login")
  }



}
