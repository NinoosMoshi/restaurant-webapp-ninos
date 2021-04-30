import { CartOrder } from './../../model/cart-order';
import { CartService } from './../../services/cart.service';
import { OrderService } from './../../services/order.service';
import { Order } from './../../model/order';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[]=[];
  page: number = 1;
  pageLength: number = 3;
  orderSize: number = 0;

  constructor(private orderService: OrderService,
              private activeRoute: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(
      () =>{
        this.finishOrders();
      }
    )

      }



  private finishOrders() {
    let result = this.activeRoute.snapshot.paramMap.has('id');
    let result1 = this.activeRoute.snapshot.paramMap.has('key');
    if (result) {
      this.getOrdersByCatId();
    } else if(result1){
      this.getOrdersByKeyword();
    }
    else {
      this.getOrders();
    }
  }

  getOrders(){
    this.orderService.getOrdersLength().subscribe(
      data =>{
        this.orderSize = data
      }
    )
    this.orderService.getAllOrders(this.page-1, this.pageLength).subscribe(
      data =>{
        this.orders = data
      }
    )
  }


  getOrdersByCatId(){
    let categoryId = this.activeRoute.snapshot.paramMap.get('id');
    this.orderService.getOrdersLengthByCategoryId(categoryId).subscribe(
      data =>{
        this.orderSize = data
      }
    )
    this.orderService.getOrdersByCategoryId(categoryId,this.page-1, this.pageLength).subscribe(
      data =>{
        this.orders = data
      }
    )
  }

  getOrdersByKeyword(){
    let word = this.activeRoute.snapshot.paramMap.get('key');
    this.orderService.getOrdersLengthByKey(word).subscribe(
      data =>{
        this.orderSize = data
      }
    )
    this.orderService.getOrdersByKeyword(word,this.page-1, this.pageLength).subscribe(
      data =>{
        this.orders = data
      }
    )
  }


  doing(){
    this.finishOrders();
  }



  onPageSize(event: Event){
     this.pageLength = +(<HTMLInputElement>event.target).value;
     this.finishOrders();
  }



  addToCart(temp: Order){
    const cartorder = new CartOrder(temp);
    this.cartService.addOrderToCart(cartorder);
  }




}
