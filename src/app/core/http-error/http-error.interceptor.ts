import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorService } from "../../shared/services/error/error.service";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBarService: SnackBarService,
    private errorService: ErrorService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const message: string = this.errorService.generateErrorMsg(error);
        this.snackBarService.openSnackBar(message);

        return error.status === 200 && error.statusText === "OK"
          ? of(message)
          : throwError(message);
      })
    );
  }
}
