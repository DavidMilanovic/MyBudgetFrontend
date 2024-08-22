import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from '../transactiondialog/transactiondialog.component';
import { AccountService } from '../../services/account.service';
import { CurrencyPipe  } from '@angular/common';
import { environment } from '../../environment/environment';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MaterialModule, CurrencyPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  @Input() isDashboarLoaded! : boolean;

  availableMoney : number = 0;
  // currency = sessionStorage.getItem('defaultCurrency');
  // defaultCurrency = this.currency ? this.currency.toUpperCase() : environment.defaultCurrency;

  defaultCurrency! : string;

  constructor(private dialog: MatDialog, private accountService : AccountService, private currencyService:CurrencyService) {}
  
  ngOnInit(): void {

    this.currencyService.getDefaultCurrency().subscribe((currency) => {
      console.log(currency);
      this.defaultCurrency = currency;
      this.accountService.getAvailableMoney(currency).subscribe((availableMoney) => {
        this.availableMoney = availableMoney.availableMoney;
      });
    });
  }

  openTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '600px', 
    });
  }
}
