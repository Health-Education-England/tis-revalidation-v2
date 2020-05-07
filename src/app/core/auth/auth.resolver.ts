import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthResolver implements Resolve<any> {
  constructor(private authService: AuthService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const isUnauthenticated = this.authService.currentSession().pipe(
      catchError(() => {
        return this.authService.signIn();
      })
    );
    return isUnauthenticated;
  }
}
