import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { TransactionComponent } from '../../layout/transaction/transaction.component';
import { Transaction } from '../../interfaces/transaction.interface';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [MaterialModule, TransactionComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit{
  transactions! : Transaction[];

  constructor(private transactionService : TransactionsService){}
  
  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (response: Transaction[]) => {
        this.transactions = response;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
}
