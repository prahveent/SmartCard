import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <header class="admin-header">
        <h1>Admin Dashboard</h1>
        <div class="header-actions">
          <span class="welcome">Welcome, Admin!</span>
          <button class="btn-logout" (click)="logout()">Logout</button>
        </div>
      </header>

      <div class="admin-content">
        <div class="admin-cards">
          <div class="admin-card">
            <h3>Product Management</h3>
            <p>Manage your product catalog</p>
            <button class="btn-primary" (click)="goToProducts()">
              View Products
            </button>
          </div>

          <div class="admin-card">
            <h3>User Management</h3>
            <p>Manage system users</p>
            <button class="btn-primary" disabled>
              Coming Soon
            </button>
          </div>

          <div class="admin-card">
            <h3>Orders</h3>
            <p>View and manage orders</p>
            <button class="btn-primary" disabled>
              Coming Soon
            </button>
          </div>

          <div class="admin-card">
            <h3>Analytics</h3>
            <p>View sales and performance metrics</p>
            <button class="btn-primary" disabled>
              Coming Soon
            </button>
          </div>
        </div>

        <div class="quick-stats">
          <h2>Quick Stats</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">12</div>
              <div class="stat-label">Total Products</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">0</div>
              <div class="stat-label">Orders Today</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">1</div>
              <div class="stat-label">Active Users</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">$0</div>
              <div class="stat-label">Revenue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #eee;
    }

    .admin-header h1 {
      color: #333;
      margin: 0;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .welcome {
      color: #666;
      font-size: 0.9rem;
    }

    .btn-logout {
      padding: 0.5rem 1rem;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.3s;
    }

    .btn-logout:hover {
      background: #c82333;
    }

    .admin-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .admin-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .admin-card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border: 1px solid #eee;
      text-align: center;
    }

    .admin-card h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .admin-card p {
      margin: 0 0 1rem 0;
      color: #666;
      font-size: 0.9rem;
    }

    .btn-primary {
      padding: 0.75rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.3s;
    }

    .btn-primary:hover:not(:disabled) {
      background: #5a6fd8;
    }

    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .quick-stats {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border: 1px solid #eee;
    }

    .quick-stats h2 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .stat-item {
      text-align: center;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #666;
      margin-top: 0.5rem;
    }

    @media (max-width: 768px) {
      .admin-header {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }

      .header-actions {
        justify-content: space-between;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
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
