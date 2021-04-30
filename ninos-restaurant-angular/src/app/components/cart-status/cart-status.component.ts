import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  orderSize :number = 0;
  orderPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartStatus();
  }

  getCartStatus(){
   this.cartService.totalOrders.subscribe(
     data =>{
       this.orderSize = data
     }
   )
    this.cartService.totalPrice.subscribe(
      data =>{
        this.orderPrice = data
      }
    )
}

}
