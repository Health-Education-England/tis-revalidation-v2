import { Injectable } from "@angular/core";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib-esm/types";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import { from, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ADMIN_ROLES, APPROVER_ROLES } from "src/environments/constants";
import { environment } from "@environment";

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

  constructor() {}

  currentSession(): Observable<CognitoUserSession> {
    return from(Auth.currentSession()).pipe(
      tap((cognitoUserSession: CognitoUserSession) => {
        const cognitoIdToken = cognitoUserSession.getIdToken();

        this.userName = cognitoIdToken.payload[this.userNameClaimKey];
        this.fullName = `${cognitoIdToken.payload.given_name} ${cognitoIdToken.payload.family_name}`;
        this.email = cognitoIdToken.payload.email;
        this.roles = cognitoIdToken.payload["cognito:roles"] || [];
        this.isRevalAdmin = this.roles.some((role) =>
          ADMIN_ROLES.includes(role)
        );

        this.isRevalApprover = this.roles.some((role) =>
          APPROVER_ROLES.includes(role)
        );

        let dbcs: string[] = cognitoIdToken.payload["cognito:groups"] || [];
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
    return Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Cognito
    });
  }

  signOut(): Promise<any> {
    return Auth.signOut({ global: true });
  }
}
