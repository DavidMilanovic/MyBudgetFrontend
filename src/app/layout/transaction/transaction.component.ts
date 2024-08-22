import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Transaction } from '../../interfaces/transaction.interface';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [ MaterialModule , CurrencyPipe, UpperCasePipe],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  @Input() transaction! : Transaction;

  //defaultCurrency = sessionStorage.getItem('defaultCurrency');
}
