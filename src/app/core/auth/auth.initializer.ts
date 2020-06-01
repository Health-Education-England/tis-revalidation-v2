import { AuthService } from "./auth.service";
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";

export function initializeApplication(
  authService: AuthService,
  router: Router
) {
  const redirectKey = "reval_redirectLocation";
  const win = window as any;
  let requestedUrl: string;
  let navigationHandler: any = () => {};
  return () =>
    authService
      .currentSession()
      .pipe(
        map(() => {
          navigationHandler = (router: Router) => {
            requestedUrl = win.localStorage.getItem(redirectKey);
            if (requestedUrl) {
              win.localStorage.removeItem(redirectKey);
              return router.navigateByUrl(requestedUrl);
            }
          };
        }),
        catchError(() => {
          requestedUrl = `${win.location.pathname}${win.location.search}${win.location.hash}`;
          win.localStorage.setItem(redirectKey, requestedUrl);
          return authService.signIn();
        })
      )
      .toPromise()
      .then(() => {
        navigationHandler(router);
      });
}
