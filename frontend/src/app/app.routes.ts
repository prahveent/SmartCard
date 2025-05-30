import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { AdminComponent } from './components/user/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard],
    data: { requiredRole: 'Admin' }
  },
  { path: '**', redirectTo: '/products' }
];
