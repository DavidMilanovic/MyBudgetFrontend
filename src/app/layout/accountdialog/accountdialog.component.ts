import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { Account } from '../../interfaces/account.interface';

@Component({
  selector: 'app-accountdialog',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './accountdialog.component.html',
  styleUrl: './accountdialog.component.css'
})
export class AccountDialogComponent implements OnInit{

  accountForm: FormGroup;
  currencies : string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    private fb: FormBuilder,
    private accountService: AccountService,
    private dashboardService: DashboardService
  ) {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      currency: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.dashboardService.getAvailableCurrencies().subscribe((currencies) => {
      this.currencies = currencies;
    })
  }

  private snackBar = inject(MatSnackBar);

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if(this.accountForm.valid){
      const accountData = this.accountForm.value;
    this.accountService.createAccount(accountData).subscribe({
      next: (createdAccount : Account) => {
        this.snackBar.open('Account created sucessfully', 'Close', {
          duration: 3000, 
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.dialogRef.close(createdAccount);
      },
      error: (error) => {
        this.snackBar.open('Failed to create account', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        console.error('Error deleting accounts:', error);
      },
    });
    this.dialogRef.close(); 
  }
    
  }

}
