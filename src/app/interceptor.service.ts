import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  storage = inject(StorageService);
  router = inject(Router);

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HTTP Interceptor triggered for:', req.url);


    if (['/user/login', '/user/register'].some(url => req.url.includes(url))) {
      return next.handle(req);
    }

    console.log('Required token for this request');

    const token = this.storage.getCredentials('token');
    if (!token) {
      console.warn('No token found! Redirecting to login.');
      this.router.navigate(['/login']);
      throw new Error('No token present');
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error?.error === 'Token has expired') {
          console.warn('Backend says: Token has expired');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
