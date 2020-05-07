import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.currentSession().pipe(
      switchMap((res) => {
        const authorization = res.getIdToken();
        request = request.clone({
          setHeaders: {
            Authorization: `${authorization.getJwtToken()}`
          }
        });
        return next.handle(request);
      }),
      catchError((err: any) => {
        return of(err);
      })
    );
  }
}
