import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  
  isLoading = false;
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(): void {
    if (this.credentials.email && this.credentials.password) {
      this.isLoading = true;
      this.errorMessage = '';      this.authService.login(this.credentials.email, this.credentials.password)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.cdr.markForCheck();
            // Navigate to appropriate page based on role
            if (response.role === 'Admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/products']);
            }
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'Invalid email or password. Please try again.';
            this.cdr.markForCheck();
            console.error('Login error:', error);
          }
        });
    }
  }
}
