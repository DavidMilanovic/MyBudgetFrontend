import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../../interfaces/account.interface';
import { MaterialModule } from '../../material/material.module';
import { CurrencyPipe } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { environment } from '../../environment/environment';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MaterialModule, CurrencyPipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  @Input() account!: Account;
  // currency = sessionStorage.getItem('defaultCurrency');
  // defaultCurrency =  this.currency ? this.currency.toUpperCase() : environment.defaultCurrency;
  defaultCurrency!: string;
  amount: number = 0;
  constructor(
    private accountService: AccountService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.currencyService.getDefaultCurrency().subscribe((currency) => {
      this.defaultCurrency = currency;

      if (this.defaultCurrency != this.account.currency) {
        console.log(this.defaultCurrency, this.account.currency);
        this.accountService
          .convertMoney(
            this.account.currency,
            this.defaultCurrency,
            this.account.balance
          )
          .subscribe((convertedMoney) => {
            this.amount = convertedMoney.convertedMoney;
          });
      } else {
        this.amount = this.account.balance;
      }
    });
  }
}
