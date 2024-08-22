import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private defaultCurrencySubject: BehaviorSubject<string>;
  defaultCurrency$: Observable<string>;

  constructor() {
    const storedCurrency = sessionStorage.getItem('defaultCurrency');
    const initialCurrency = storedCurrency ? storedCurrency : environment.defaultCurrency;

    this.defaultCurrencySubject = new BehaviorSubject<string>(initialCurrency);
    this.defaultCurrency$ = this.defaultCurrencySubject.asObservable();

    if (!storedCurrency) {
      sessionStorage.setItem('defaultCurrency', environment.defaultCurrency);
    }
  }

  setDefaultCurrency(currency: string): void {
    sessionStorage.setItem('defaultCurrency', currency.toUpperCase());
    console.log(currency.toUpperCase())
    this.defaultCurrencySubject.next(currency);
  }

  getDefaultCurrency(): Observable<string> {
    return this.defaultCurrency$;
  }
}
