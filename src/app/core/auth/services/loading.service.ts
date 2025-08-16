import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading = signal(false);
  private requestCount = 0;

  get isLoading() {
    return this._isLoading.asReadonly();
  }

  setLoading(loading: boolean) {
    if (loading) {
      this.requestCount++;
    } else {
      this.requestCount = Math.max(0, this.requestCount - 1);
    }
    
    this._isLoading.set(this.requestCount > 0);
  }

  reset() {
    this.requestCount = 0;
    this._isLoading.set(false);
  }
}