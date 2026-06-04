import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

const API_BASE_URL = 'https://dummyjson.com';

/**
 * Prepends the DummyJSON base URL to every outgoing request
 * and normalizes HTTP errors into a plain Error with a readable message.
 *
 * Using a functional interceptor (Angular 15+) keeps this stateless
 * and avoids the need for an injectable class.
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({ url: `${API_BASE_URL}${req.url}` });

  return next(apiReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const message: string =
        typeof error.error?.message === 'string'
          ? error.error.message
          : (error.message ?? 'An unexpected error occurred');

      return throwError(() => new Error(message));
    }),
  );
};
