import { Component, inject, Inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-deletealldialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './deletealldialog.component.html',
  styleUrl: './deletealldialog.component.css'
})
export class DeleteAllDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAllDialogComponent>, private accountService: AccountService) {}

  private snackBar = inject(MatSnackBar);

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.accountService.deleteAll().subscribe({
      next: () => {
        this.snackBar.open('All accounts deleted successfully', 'Close', {
          duration: 3000, 
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        this.snackBar.open('Failed to delete accounts', 'Close', {
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
