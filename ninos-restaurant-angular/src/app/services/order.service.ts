import { Order } from './../model/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = "http://localhost:8080/api";



  constructor(private http: HttpClient) { }


  // getAllOrders(): Observable<Order[]>{
  //  return this.http.get<Order[]>(`${this.baseUrl}/allOrders`).pipe(
  //    map( response => response)
  //  );
  // }
  getAllOrders(page, size): Observable<Order[]>{
    let head = new HttpHeaders({
      Authorization: sessionStorage.getItem('token')
    })
    return this.http.get<Order[]>(`${this.baseUrl}/allOrders?page=${page}&size=${size}`, {headers: head}).pipe(
      map( response => response)
    );
   }




  // getOrdersByCategoryId(categoryId:string): Observable<Order[]>{
  //   return this.http.get<Order[]>(`${this.baseUrl}/category?id=${categoryId}`).pipe(
  //     map(response => response)
  //   );
  // }
  getOrdersByCategoryId(categoryId:string,page,size): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}/category?id=${categoryId}&page=${page}&size=${size}`).pipe(
      map(response => response)
    );
  }



  // http://localhost:8080/api/orderkey?keyword={value}
  // getOrdersByKeyword(keyword: string): Observable<Order[]>{
  //   return this.http.get<Order[]>(`${this.baseUrl}/orderkey?keyword=${keyword}`).pipe(
  //     map(response => response)
  //   );
  // }
  getOrdersByKeyword(keyword: string,page,size): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}/orderkey?keyword=${keyword}&page=${page}&size=${size}`).pipe(
      map(response => response)
    );
  }



  // http://localhost:8080/api/order?id={value}
  getOrderById(id:string): Observable<Order>{
    return this.http.get<Order>(`${this.baseUrl}/order?id=${id}`).pipe(
      map(response => response)
    );
  }



  // http://localhost:8080/api/orderSize
  getOrdersLength(): Observable<number>{
     return this.http.get<number>(`${this.baseUrl}/orderSize`).pipe(
       map(response => response)
     );
  }


  // http://localhost:8080/api/categoryidsize?id={value}
  getOrdersLengthByCategoryId(id: string): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/categoryidsize?id=${id}`).pipe(
      map(response => response)
    );
 }


  // http://localhost:8080/api/keysize?key={value}
  getOrdersLengthByKey(Key: string): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/keysize?key=${Key}`).pipe(
      map(response => response)
    );
 }



}
