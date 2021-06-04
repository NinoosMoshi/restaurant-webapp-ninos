import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { OrderService } from './../../services/order.service';
import { Order } from './../../model/order';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  constructor(private router: Router,
              private authenticationService:AuthenticationService,
              private cartService:CartService) { }

  ngOnInit(): void {
  }


  doSearch(value: string){
     this.router.navigateByUrl(`/orders/${value}`)
  }

  isAuthenticatedUser(){
    return this.authenticationService.isLogin();
  }

  logout(){
    this.cartService.orders = [];
    this.cartService.totalOrders.next(0);
    this.cartService.totalPrice.next(0);

    this.authenticationService.logout();
    this.router.navigateByUrl("/login")
  }



}
