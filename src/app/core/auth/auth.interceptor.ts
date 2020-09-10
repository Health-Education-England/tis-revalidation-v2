import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, of, from } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { Auth } from "aws-amplify";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return from(Auth.currentSession()).pipe(
      switchMap((res) => {
        const authorization = res.getIdToken();
        request = request.clone({
          setHeaders: {
            Authorization: `${authorization.getJwtToken()}`
          }
        });
        return next.handle(request);
      }),
      catchError((error: any) => of(error))
    );
  }
}
