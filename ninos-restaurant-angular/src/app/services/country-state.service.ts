import { State } from './../model/state';
import { map } from 'rxjs/operators';
import { Country } from './../model/country';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryStateService {

 private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }


  getAllCountries(): Observable<Country[]>{
   return this.http.get<Country[]>(`${this.baseUrl}/countries`).pipe(
     map(response => response)
   );
  }


  getAllStates(): Observable<State[]>{
    return this.http.get<State[]>(`${this.baseUrl}/states`).pipe(
      map(response => response)
    );
  }


  getStatesByCode(code: string): Observable<State[]>{
    return this.http.get<State[]>(`${this.baseUrl}/state-code?code=${code}`).pipe(
      map(response => response)
    );
  }



}
