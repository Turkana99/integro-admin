import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  userData: any;
  constructor(private authService: AuthService) {
    this.userData = this.authService.getUserDetails();
  }

  logout() {
    this.authService.logout();
  }

  getUser(): any {
    return this.userData;
  }
}
