import { Order } from "./order";

export class CartOrder {

  id: number;
  orderName: string;
  price: number
  image: string;
  quantity: number;


  constructor(order: Order){
    this.id = order.id;
    this.orderName = order.orderName;
    this.price = order.price;
    this.image = order.image;
    this.quantity = 1;
  }


}
