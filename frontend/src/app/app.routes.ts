import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AdminComponent } from './components/admin/admin.component';
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
