import { Item } from './item';
import { RequestOrder } from './request-order';
import { Address } from './address';
import { Client } from './client';
export class PurchaseRequest {

  client: Client
  fromAddress: Address;
  toAddress: Address;
  requestOrder: RequestOrder;
  items: Item[];



}
