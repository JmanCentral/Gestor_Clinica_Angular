import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2'; 

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error del cliente: ${error.error.message}`;
      } else {
        errorMessage = `Error del servidor (${error.status}): ${error.message}`;
      }

      // Muestra alerta
      Swal.fire('Error', errorMessage, 'error');

      return throwError(() => new Error(errorMessage));
    })
  );
};
