import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { CartOrder } from './../../model/cart-order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  orders: CartOrder[] = [];
  totalOrder: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getAllOrders();
    this.getTotals();
    this.cartService.calculateTotals();
  }

  getTotals(){
    this.cartService.totalOrders.subscribe( data => {
      this.totalOrder = data
    });
    this.cartService.totalPrice.subscribe( data =>{
      this.totalPrice = data
    });
  }

 getAllOrders(){
    this.orders = this.cartService.orders;
 }

 addOrder(temp: CartOrder){
    this.cartService.addOrderToCart(temp);
 }

 removeOrder(temp: CartOrder){
   this.cartService.removeOrder(temp);
 }

 remove(temp: CartOrder){
   this.cartService.remove(temp);
 }


 checkOut(){
   this.router.navigateByUrl("/checkout");
 }


}
