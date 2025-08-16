import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);
  
  // Start loading
  loadingService.setLoading(true);
  
  return next(req).pipe(
    finalize(() => {
      // Stop loading when request completes (success or error)
      loadingService.setLoading(false);
    })
  );
};