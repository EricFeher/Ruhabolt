import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./shared/services/auth.guard";
import {AdminGuard} from "./shared/services/admin.guard";

const routes: Routes = [
  { path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  { path: 'signup',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},
  {path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]},
  {path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuard]},
  {path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard,AdminGuard]},
  {path:'',
    redirectTo:'/login',
    pathMatch: 'full'},
  {path: '**',
    redirectTo: '/login'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
