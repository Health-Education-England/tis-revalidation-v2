import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  ADMIN_ROLES,
  APPROVER_ROLES,
  BETA_ROLES
} from "src/environments/constants";
import { environment } from "@environment";
import { authWrapper } from "./auth-wrapper";
import { AuthSession } from "aws-amplify/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public userName = "";
  public email = "";
  public fullName = "";
  public userNameClaimKey = "preferred_username";
  public roles: string[] = [];
  public userDesignatedBodies: string[] = [];
  public inludesLondonDbcs = false;
  public isRevalAdmin = false;
  public isRevalApprover = false;
  public isRevalBeta = false;

  currentSession(): Observable<AuthSession> {
    return from(authWrapper.fetchAuthSession()).pipe(
      tap((cognitoUserSession: AuthSession) => {
        if (cognitoUserSession.tokens) {
          const cognitoIdToken = cognitoUserSession.tokens.idToken;
          this.userName = cognitoIdToken?.payload[this.userNameClaimKey] as string;
          this.fullName = `${cognitoIdToken?.payload["given_name"] as string} ${cognitoIdToken?.payload["family_name"] as string}`;
          this.email = cognitoIdToken?.payload["email"] as string;
          this.roles = cognitoIdToken?.payload["cognito:roles"] as string[]|| [];
          this.isRevalAdmin = this.roles.some((role) =>
            ADMIN_ROLES.includes(role)
          );

          this.isRevalApprover = this.roles.some((role) =>
            APPROVER_ROLES.includes(role)
          );
          this.isRevalBeta = this.roles.some((role) => BETA_ROLES.includes(role));

          let dbcs: string[] = cognitoIdToken?.payload["cognito:groups"] as string[] || [];
          let londonDBCodes: string[] = environment.londonDBCs.map(
            (dbc) => dbc.key
          );
          this.inludesLondonDbcs = dbcs.some((dbc) =>
            londonDBCodes.includes(dbc)
          );

          if (this.inludesLondonDbcs) {
            dbcs = Array.from(new Set([...londonDBCodes, ...dbcs]));
          }
          this.userDesignatedBodies = dbcs;
        }
      }),
      catchError(() => {
        window.localStorage.setItem(
          "reval_redirectLocation",
          `${location.pathname}${location.search}${location.hash}`
        );
        return this.signIn();
      })
    );
  }

  signIn(): Promise<any> {
    return authWrapper.signInWithRedirect();
  }

  signOut(): Promise<any> {
    return authWrapper.signOut();
  }
}
