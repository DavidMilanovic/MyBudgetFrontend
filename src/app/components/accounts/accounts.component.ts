import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interfaces/account.interface';
import { AccountComponent } from "../../layout/account/account.component";
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from '../../layout/accountdialog/accountdialog.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [MaterialModule, AccountComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  
  accounts : Account[] = []; 
  
  constructor(private accountService: AccountService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (response: Account[]) => {
        this.accounts = response;
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accounts.push(result);
      }
    });
  }


}
