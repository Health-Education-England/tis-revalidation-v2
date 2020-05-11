import { AuthService } from "./auth.service";
import { catchError } from "rxjs/operators";

export function initializeApplication(authService: AuthService) {
  return () => {
    return authService
      .currentSession()
      .pipe(
        catchError(() => {
          return authService.signIn();
        })
      )
      .toPromise();
  };
}
