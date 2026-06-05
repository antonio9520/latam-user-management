import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({ url: `${environment.apiBaseUrl}${req.url}` });

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
