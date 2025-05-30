import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }

  goToProducts(): void {
    window.location.href = '/products';
  }
}
