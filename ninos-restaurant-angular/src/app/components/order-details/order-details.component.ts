import { CartOrder } from './../../model/cart-order';
import { CartService } from './../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from './../../model/order';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order = null;

  constructor(private orderService: OrderService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.getOrderByOrderId();
  }


 getOrderByOrderId(){
   let orderId = this.activeRoute.snapshot.paramMap.get('id');
   this.orderService.getOrderById(orderId).subscribe( data =>{
     this.order = data
   })
 }

 undo(){
   this.router.navigateByUrl("/orders");
 }


 addToCart(order: Order){
   const orderCart = new CartOrder(order);
   this.cartService.addOrderToCart(orderCart);

 }


}
