import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  
  // Clone the request and add authorization header if token exists
  const authToken = localStorage.getItem('authToken');
  let authReq = req;
  
  if (authToken && !req.url.includes('auth/login') && !req.url.includes('auth/register')) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  // Add common headers
  authReq = authReq.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  return next(authReq).pipe(
    catchError(error => {
      // Handle authentication errors
      if (error.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        router.navigate(['/auth/login']);
      }
      
      // Handle server errors
      if (error.status >= 500) {
        console.error('Server error:', error);
      }
      
      return throwError(() => error);
    })
  );
};