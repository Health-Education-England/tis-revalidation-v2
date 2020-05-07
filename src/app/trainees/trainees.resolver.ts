import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable, from, of } from "rxjs";
import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Auth } from "aws-amplify";
import { catchError } from "rxjs/operators";

@Injectable()
export class TraineesResolver implements Resolve<any> {
  constructor(private store: Store, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const isUnauthenticated = from(
      Auth.currentSession().catch(() =>
        window.location.replace(
          "https://stage-auth.tis.nhs.uk/login?client_id=3adscm2usl3lop510nfijpr12f&response_type=token&scope=aws.cognito.signin.user.admin+openid&redirect_uri=http://localhost:4200"
        )
      )
    );

    return isUnauthenticated;
  }
}
