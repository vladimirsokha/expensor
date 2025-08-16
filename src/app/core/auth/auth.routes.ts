import { Routes } from '@angular/router';

export default [
    {path: '', redirectTo: 'login'},
    {path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)},
    {path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)},
    {path: 'password-recovery', loadComponent: () => import('./pages/password-recovery/password-recovery.component').then(m => m.PasswordRecoveryComponent)}
] satisfies Routes;
