import { CartOrder } from './cart-order';
export class Item {

  image: string;
  quantity: number;
  price: number;

  constructor(order: CartOrder){
    this.image = order.image
    this.quantity = order.quantity
    this.price = order.price
  }

}
