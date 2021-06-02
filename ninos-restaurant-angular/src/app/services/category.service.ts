import { Category } from './../model/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8080/api/allCategories";

  constructor(private http: HttpClient) { }


  getAllCategories(): Observable<Category[]>{
    let head = new HttpHeaders({
      Authorization: sessionStorage.getItem('token')
    })
    return this.http.get<Category[]>(this.baseUrl, {headers: head}).pipe(
      map(
        response => response
      )
    );
  }



}
