import { Routes } from '@angular/router';

export default [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), pathMatch: 'full'},
    {path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), pathMatch: 'full'},
    {path: 'password-recovery', loadComponent: () => import('./pages/password-recovery/password-recovery.component').then(m => m.PasswordRecoveryComponent), pathMatch: 'full'}
] satisfies Routes;
