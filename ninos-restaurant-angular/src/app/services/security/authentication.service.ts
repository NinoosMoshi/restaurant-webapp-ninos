import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = "http://localhost:8080";

  constructor(private http:HttpClient, private cookie: CookieService) { }

 executeAuthentication(email:string, password:any): Observable<any>{
   return this.http.post<any>(`${this.baseUrl}/signin`, {email, password}).pipe(
     map(
        response =>{
          sessionStorage.setItem("email",response.email)
          sessionStorage.setItem("token",`Bearer ${response.token}`)
          this.cookie.set("email",response.email)
          this.cookie.set("token",`Bearer ${response.token}`)
       return response
      })
   );
 }


 userActive(email:string, password:any): Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/active`, {email, password}).pipe(
    map(
       response =>{
        return response
     })
  );
}


 createUser(email:string, password:any):Observable<any>{
   return this.http.post<any>(`${this.baseUrl}/signup`, {email, password}).pipe(
     map(response => response)
   );
 }

 activeAccount(mail:string, code:string):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/active`, {mail, code}).pipe(
    map(response => response)
  );
}

 getAuthentication(){
   return sessionStorage.getItem("email")
 }

 getToken(){
   if(this.getAuthentication()){
      return sessionStorage.getItem("token")
   }
 }

 isLogin(){
   return !(sessionStorage.getItem("email") == null || sessionStorage.getItem("token") == null);
 }

 logout(){
   sessionStorage.removeItem("email");
   sessionStorage.removeItem("token");
   this.cookie.delete('email');
   this.cookie.delete('token');
 }

}
