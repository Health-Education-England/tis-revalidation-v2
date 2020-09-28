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
        }),
        catchError(() => {
          requestedUrl = `${win.location.pathname}${win.location.search}${win.location.hash}`;
          win.localStorage.setItem(redirectKey, requestedUrl);
          const temp = authService.signIn();

          return temp;
        })
      )
      .toPromise()
      .then((response) => {
        if (authService.userRoles.length > 0) {
          if (authService.userRoles.includes("HEE Admin Revalidation")) {
            navigationHandler();
          } else {
            alert("Please contact administrator for access");
            authService.signOut();
          }
        }
      });
}
