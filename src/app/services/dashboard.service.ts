import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl = `${environment.apiUrl}/currencies`; 

  constructor(private http: HttpClient) {}


  getAvailableCurrencies() : Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl)
  }


  getExchangeDate(defaultCurrency : string) : Observable<Date> {
    return this.http.get<{date:string}>(`${environment.apiUrl}/currencies/${defaultCurrency}`).pipe(
      map((response) => new Date(response.date)))
  }
  
}
