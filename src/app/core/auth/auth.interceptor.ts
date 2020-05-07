import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, from } from "rxjs";
import { Auth } from "aws-amplify";
import { switchMap } from "rxjs/operators";

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
      })
    );
  }
}
