import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { AuthSession } from "aws-amplify/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.currentSession().pipe(
      switchMap((session: AuthSession) => {
        request = request.clone({
          setHeaders: {
            Authorization: `${session.tokens?.idToken?.toString()}`
          }
        });
        return next.handle(request);
      }),
      catchError((error) => throwError(() => new Error(error)))
    );
  }
}
