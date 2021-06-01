import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = "http://localhost:8080";

  constructor(private http:HttpClient) { }

 executeAuthentication(email:string, password:any): Observable<any>{
   return this.http.post<any>(`${this.baseUrl}/signin`, {email, password}).pipe(
     map( response => response)
   );
 }


}
