import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="product-list-container">
      <header class="header">
        <h1>SmartCart Products</h1>
        <div class="header-actions">
          <div class="search-container">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              (input)="onSearch()"
              placeholder="Search products..."
              class="search-input"
            >
          </div>
          <button 
            *ngIf="authService.isAdmin()" 
            class="btn-add-product"
            (click)="showAddProduct()"
          >
            Add Product
          </button>
          <button class="btn-logout" (click)="logout()">
            Logout
          </button>
        </div>
      </header>

      <div *ngIf="isLoading" class="loading">
        Loading products...
      </div>

      <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div class="products-grid" *ngIf="!isLoading">
        <div 
          *ngFor="let product of filteredProducts" 
          class="product-card"
        >
          <img 
            [src]="product.imageUrl" 
            [alt]="product.name"
            class="product-image"
            (error)="onImageError($event)"
          >
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-price">\${{ product.price | number:'1.2-2' }}</div>
            <button class="btn-add-to-cart" (click)="addToCart(product)">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="!isLoading && filteredProducts.length === 0" class="no-products">
        <p>No products found.</p>
      </div>
    </div>
  `,
  styles: [`
    .product-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .header h1 {
      color: #333;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-container {
      position: relative;
    }

    .search-input {
      padding: 0.5rem 1rem;
      border: 2px solid #ddd;
      border-radius: 25px;
      width: 250px;
      font-size: 0.9rem;
      transition: border-color 0.3s;
    }

    .search-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .btn-add-product, .btn-logout {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.3s;
    }

    .btn-add-product {
      background: #28a745;
      color: white;
    }

    .btn-add-product:hover {
      background: #218838;
    }

    .btn-logout {
      background: #dc3545;
      color: white;
    }

    .btn-logout:hover {
      background: #c82333;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      font-size: 1.1rem;
      color: #666;
    }

    .error-message {
      background: #f8d7da;
      color: #721c24;
      padding: 0.75rem;
      border-radius: 5px;
      margin-bottom: 1rem;
      text-align: center;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .product-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    }

    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      background: #f8f9fa;
    }

    .product-info {
      padding: 1rem;
    }

    .product-name {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
      color: #333;
      font-weight: 600;
    }

    .product-description {
      margin: 0 0 1rem 0;
      color: #666;
      font-size: 0.9rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #28a745;
      margin-bottom: 1rem;
    }

    .btn-add-to-cart {
      width: 100%;
      padding: 0.75rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.3s;
    }

    .btn-add-to-cart:hover {
      background: #5a6fd8;
    }

    .no-products {
      text-align: center;
      padding: 3rem;
      color: #666;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: stretch;
      }

      .header-actions {
        justify-content: center;
      }

      .search-input {
        width: 200px;
      }

      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';
  isLoading = true;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products. Please try again.';
        this.isLoading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.productService.searchProducts(this.searchTerm).subscribe({
        next: (products) => {
          this.filteredProducts = products;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        }
      });
    } else {
      this.filteredProducts = this.products;
    }
  }

  addToCart(product: Product): void {
    // For now, just show an alert
    alert(`${product.name} added to cart! (This is a demo - cart functionality will be implemented later)`);
  }

  showAddProduct(): void {
    alert('Add Product functionality will be implemented in the next iteration');
  }

  logout(): void {
    this.authService.logout();
    // Navigation will be handled by the app component or router
    window.location.href = '/login';
  }
  onImageError(event: any): void {
    // Try a more reliable placeholder service first
    if (event.target.src.includes('picsum.photos')) {
      // If picsum fails, use a simple data URI fallback
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjFGMUYxIi8+CjxyZWN0IHg9IjEyNSIgeT0iNzUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgZmlsbD0iI0Q5RDlEOSIvPgo8dGV4dCB4PSIxNTAiIHk9IjEyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
    } else {
      // First fallback: try picsum photos
      event.target.src = 'https://picsum.photos/300/200?random=' + Math.floor(Math.random() * 1000);
    }
  }
}
