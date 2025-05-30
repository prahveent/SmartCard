---
applyTo: "**/frontend/**"
---

# Frontend Guidelines

## Angular Application Structure

### Folder Organization

```
src/
├── app/
│   ├── components/
│   │   ├── user/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.css
│   │   │   └── admin/
│   │   │       ├── admin.component.ts
│   │   │       ├── admin.component.html
│   │   │       └── admin.component.css
│   │   └── product/
│   │       └── product-list/
│   │           ├── product-list.component.ts
│   │           ├── product-list.component.html
│   │           └── product-list.component.css
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── product.service.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   └── product.model.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   └── pages/
│       ├── home/
│       └── dashboard/
├── assets/
└── environments/
```

### Component File Structure

#### **MANDATORY**: Each component must have separate files:
- **TypeScript Logic**: `component-name.component.ts`
- **HTML Template**: `component-name.component.html`
- **CSS Styles**: `component-name.component.css` (when styling is needed)

#### **DO NOT** use inline templates or styles in components
- ❌ **Incorrect**: `template: '<div>...</div>'`
- ✅ **Correct**: `templateUrl: './component-name.component.html'`
- ❌ **Incorrect**: `styles: ['.class { color: red; }']`
- ✅ **Correct**: `styleUrls: ['./component-name.component.css']`

### Component Structure

#### 1. Components
- Keep components small and focused (ideally less than 50 lines in .ts file)
- Use OnPush change detection when possible
- Handle UI logic only, delegate business logic to services
- Always use separate files for template, styles, and logic

#### 2. Services
- Handle API calls and business logic
- Use dependency injection
- Return Observables for async operations

#### 3. Models
- Define TypeScript interfaces for data structures
- Use for type safety and IntelliSense

### Angular Patterns

#### Component Example (Correct - Separate Files)
```typescript
// user.component.ts
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  constructor(private userService: UserService) {}
}
```

```html
<!-- user.component.html -->
<div class="user-container">
  <h2>User Management</h2>
  <!-- User content here -->
</div>
```

```css
/* user.component.css */
.user-container {
  padding: 20px;
  border: 1px solid #ddd;
}
```

#### Service Example
```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}
```

### File Naming Conventions

- **Components**: 
  - TypeScript: `component-name.component.ts`
  - HTML: `component-name.component.html`
  - CSS: `component-name.component.css`
- **Services**: `service-name.service.ts`
- **Models**: `model-name.model.ts`
- **Guards**: `guard-name.guard.ts`
- **Interceptors**: `interceptor-name.interceptor.ts`

### Component Creation Workflow

1. **Create Component Folder** → Create folder under appropriate category (user/ or product/)
2. **Create TypeScript File** → Define component logic and metadata
3. **Create HTML Template** → Define component structure and data binding
4. **Create CSS File** → Define component-specific styles (if needed)
5. **Update Imports** → Import and register in app routes or parent components

### Best Practices

#### File Organization
- **One component per folder**: Each component should have its own folder
- **Consistent naming**: Use kebab-case for folder and file names
- **Logical grouping**: Group related components under feature folders (user/, product/)
- **Separation of concerns**: Keep logic, template, and styles in separate files

#### Component Development
- **Single responsibility**: Each component should have one clear purpose
- **Reusability**: Design components to be reusable across the application
- **Type safety**: Use TypeScript interfaces and proper typing
- **Error handling**: Handle errors gracefully in components and services
- **Performance**: Use OnPush change detection for better performance
- **Change Detection**: When using OnPush, inject ChangeDetectorRef and call markForCheck() after async operations

#### OnPush Change Detection Pattern
When using `ChangeDetectionStrategy.OnPush`, you must manually trigger change detection after async operations:

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  
  loadData(): void {
    this.service.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.cdr.markForCheck(); // ✅ Required for OnPush
      },
      error: (error) => {
        this.errorMessage = 'Failed to load data';
        this.cdr.markForCheck(); // ✅ Required for OnPush
      }
    });
  }
}
```

#### Template Guidelines
- **Semantic HTML**: Use proper HTML5 semantic elements
- **Accessibility**: Include proper ARIA attributes and roles
- **Data binding**: Use Angular's data binding syntax correctly
- **Template readability**: Keep templates clean and well-formatted

#### Styling Guidelines
- **Component-specific**: Keep styles scoped to the component
- **CSS methodology**: Use consistent CSS naming conventions (BEM recommended)
- **Responsive design**: Ensure components work on different screen sizes
- **CSS variables**: Use CSS custom properties for consistent theming

### Example: Creating a New Component

```bash
# 1. Create component folder
mkdir src/app/components/user/profile

# 2. Create the three required files
touch src/app/components/user/profile/profile.component.ts
touch src/app/components/user/profile/profile.component.html
touch src/app/components/user/profile/profile.component.css
```

### Component Template Structure

```typescript
// profile.component.ts
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  
  // Component logic here
  // Remember to call this.cdr.markForCheck() after async operations
}
```

```html
<!-- profile.component.html -->
<div class="profile-container">
  <!-- Template content here -->
</div>
```

```css
/* profile.component.css */
.profile-container {
  /* Component styles here */
}
```

### Service Integration Best Practices

#### Correct Service Usage with OnPush
```typescript
export class ProductListComponent {
  products: Product[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
        this.cdr.markForCheck(); // ✅ Essential for OnPush
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
        this.cdr.markForCheck(); // ✅ Essential for OnPush
      }
    });
  }
}
```

#### Service Pattern
```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}
  
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }
}
```

### Common Pitfalls and Troubleshooting

#### ❌ Component Stuck in Loading State
**Problem**: Component shows "Loading..." indefinitely even though backend returns data.

**Cause**: Using `OnPush` change detection without calling `markForCheck()`.

**Solution**: 
```typescript
// ❌ Wrong - missing markForCheck()
this.service.getData().subscribe(data => {
  this.data = data;
  this.loading = false; // UI won't update!
});

// ✅ Correct - with markForCheck()
this.service.getData().subscribe(data => {
  this.data = data;
  this.loading = false;
  this.cdr.markForCheck(); // UI will update
});
```

#### ❌ Inline Templates/Styles
**Problem**: Using inline templates or styles instead of separate files.

**Solution**: Always use separate files:
```typescript
// ❌ Wrong
@Component({
  template: '<div>Inline template</div>',
  styles: ['.class { color: red; }']
})

// ✅ Correct
@Component({
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})
```

#### ❌ Duplicate Interfaces
**Problem**: Defining interfaces in service files instead of model files.

**Solution**: Use shared model interfaces:
```typescript
// ❌ Wrong - interface in service
export interface Product { ... }
@Injectable()
export class ProductService { ... }

// ✅ Correct - interface in model, imported in service
// models/product.model.ts
export interface Product { ... }

// services/product.service.ts
import { Product } from '../models/product.model';
```

### Migration Checklist

When refactoring existing components to follow these guidelines:

- [ ] Create separate component folder under appropriate category (`user/`, `product/`)
- [ ] Extract HTML template to `.component.html` file
- [ ] Extract CSS styles to `.component.css` file  
- [ ] Update `@Component` decorator to use `templateUrl` and `styleUrls`
- [ ] Add `ChangeDetectionStrategy.OnPush`
- [ ] Inject `ChangeDetectorRef` in constructor
- [ ] Add `cdr.markForCheck()` calls after async operations
- [ ] Update import paths in routing and parent components
- [ ] Remove old component files
- [ ] Test component functionality
