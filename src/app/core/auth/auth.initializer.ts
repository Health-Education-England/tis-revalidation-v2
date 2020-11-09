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
          navigationHandler = () => {
            requestedUrl = win.localStorage.getItem(redirectKey);
            if (requestedUrl) {
              win.localStorage.removeItem(redirectKey);
              return router.navigateByUrl(requestedUrl);
            }
          };
        })
      )
      .toPromise()
      .then(() => navigationHandler());
}
