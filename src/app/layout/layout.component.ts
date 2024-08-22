import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from "./footer/footer.component";
import { DashboardComponent } from '../components/dashboard/dashboard.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, MaterialModule, NavbarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isDashboardLoaded : boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isDashboardLoaded = this.router.url.includes('/dashboard');
      }
    });
  }

    onActivate(event: any): void {
      this.isDashboardLoaded = event instanceof DashboardComponent;
    }
}
