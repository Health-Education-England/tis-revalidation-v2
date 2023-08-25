import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorService } from "../../shared/services/error/error.service";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBarService: SnackBarService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            this.router.navigateByUrl("/404");
            return throwError(() => new Error("404 page not found"));
          }
        }
        const message: string = this.errorService.generateErrorMsg(error);
        this.snackBarService.openSnackBar(message);
        return throwError(() => new Error(message));
      })
    );
  }
}
