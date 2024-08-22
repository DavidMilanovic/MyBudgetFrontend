import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionsService } from '../../services/transactions.service';
import { Account } from '../../interfaces/account.interface';
import { DashboardService } from '../../services/dashboard.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-transaction-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transactiondialog.component.html',
  styleUrls: ['./transactiondialog.component.css']
})
export class TransactionDialogComponent implements OnInit {

  transactionForm: FormGroup;
  currencies: string[] = [];
  accounts : Account[]= [] ;

  private snackBar : MatSnackBar = inject(MatSnackBar);



  constructor(private fb: FormBuilder, public dialogRef : MatDialogRef<TransactionDialogComponent>,
     private transactionService : TransactionsService, private dashboardService : DashboardService,
    private accountService : AccountService ) {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      accountId: ['', Validators.required],
      currency: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.dashboardService.getAvailableCurrencies().subscribe((currencies) => {
      this.currencies = currencies;
    })

    this.accountService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.transactionForm.valid) {
      this.transactionService.createTransaction(this.transactionForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Transaction created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
          });
          this.dialogRef.close(this.transactionForm.value);
        },
        error: (error) => {
          this.snackBar.open('Failed to create transaction', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'error-snackbar',
          });
          console.error('Error creating transaction:', error);
        }
      });
    }
  }
}
