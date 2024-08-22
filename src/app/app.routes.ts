import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      title: "ProductDock",
      children: [
        { path: '', redirectTo: 'accounts', pathMatch: 'prefix' },
        { path: 'accounts', component: AccountsComponent },
        { path: 'transactions', component: TransactionsComponent },
        { path: 'dashboard', component: DashboardComponent},
      ],
      
    },
  ];