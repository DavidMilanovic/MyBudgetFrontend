import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../interfaces/account.interface';
import { environment } from '../environment/environment';
import { AvailableMoney } from '../interfaces/available-money.interface';
import { ConvertedMoney } from '../interfaces/converted-money.interface';
import { CurrencyService } from './currency.service';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private apiUrl = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient, private currencyService : CurrencyService) {}

  // private defaultCurrency = sessionStorage.getItem('defaultCurrency');


  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}`);
  }

  createAccount(account : Account):Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }

  deleteAll() : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`);
  }

  getAvailableMoney(defaultCurrency : string) : Observable<AvailableMoney>{
    return this.http.get<AvailableMoney>(`${this.apiUrl}/availableMoney/${defaultCurrency}`)
  }

  convertMoney(fromCurrency : string, toCurrency:string, amount:number) : Observable<ConvertedMoney>{
    return this.http.get<ConvertedMoney>(`${environment.apiUrl}/currencies/convert/${fromCurrency}-${toCurrency}-${amount}`);
  }
}

