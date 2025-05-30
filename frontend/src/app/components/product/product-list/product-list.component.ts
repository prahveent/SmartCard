import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';
  isLoading = true;
  errorMessage = '';
  constructor(
    private productService: ProductService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products. Please try again.';
        this.isLoading = false;
        this.cdr.markForCheck();
        console.error('Error loading products:', error);
      }
    });
  }
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.productService.searchProducts(this.searchTerm).subscribe({
        next: (products) => {
          this.filteredProducts = products;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Search error:', error);
          this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          this.cdr.markForCheck();
        }
      });
    } else {
      this.filteredProducts = this.products;
      this.cdr.markForCheck();
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
