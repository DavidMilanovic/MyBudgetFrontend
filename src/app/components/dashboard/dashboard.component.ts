import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { DashboardService } from '../../services/dashboard.service';
import { DeleteAllDialogComponent } from '../../layout/deletealldialog/deletealldialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environment/environment';
import { DatePipe } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MaterialModule, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  // sessionCurrency = sessionStorage.getItem('defaultCurrency');
  // defaultCurrency: string = this.sessionCurrency ? this.sessionCurrency.toUpperCase() : environment.defaultCurrency; 
  defaultCurrency! : string;
  exchangeDate?: Date;
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  constructor(private dashboardService: DashboardService, private currencyService : CurrencyService) {}

  ngOnInit(): void {
  
    this.dashboardService.getAvailableCurrencies().subscribe((currencies) => {
      this.currencies = currencies;
    })

    this.currencyService.getDefaultCurrency().subscribe((currency) => {
      this.defaultCurrency = currency;
      this.dashboardService.getExchangeDate(this.defaultCurrency).subscribe((date) => {
        this.exchangeDate = date;
      })
    })
  
  }
  currencies : string[] = [];

  updateDefaultCurrency(currency: string): void {
    // this.defaultCurrency = currency.toUpperCase();
    // sessionStorage.setItem('defaultCurrency', currency);
    this.currencyService.setDefaultCurrency(currency.toUpperCase());
    this.dashboardService.getExchangeDate(currency).subscribe({
      next: (date) => {
        this.exchangeDate = date;
        this.snackBar.open(`Default currency updated to ${currency.toUpperCase()}`, 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      error: (error) => {
        this.snackBar.open('Failed to update the default currency', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        console.error('Error updating currency:', error);
      }
    });
  }
  

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteAllDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
