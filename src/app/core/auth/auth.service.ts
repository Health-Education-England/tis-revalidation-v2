import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  ADMIN_ROLES,
  APPROVER_ROLES,
  BETA_ROLES
} from "src/environments/constants";
import { environment } from "@environment";

import {
  fetchAuthSession,
  signInWithRedirect,
  AuthSession,
  signOut
} from 'aws-amplify/auth';

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

  private getStringClaim(payload: Record<string, unknown>, key: string): string {
    const value = payload[key];
    if (typeof value === "string") {
      return value;
    }
    throw new Error(`IdToken Claim ${key} is not a string`);
  }

  currentSession(): Observable<AuthSession> {
    return from(fetchAuthSession()).pipe(
      tap((cognitoUserSession: AuthSession) => {
        if (!cognitoUserSession.tokens) {
          const cognitoIdToken = cognitoUserSession.tokens.idToken;
          this.userName = this.getStringClaim(cognitoIdToken?.payload, this.userNameClaimKey);
          this.fullName = `${this.getStringClaim(cognitoIdToken?.payload, "given_name")} ${this.getStringClaim(cognitoIdToken.payload, "family_name")}`;
          this.email = this.getStringClaim(cognitoIdToken?.payload, "email");
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
        console.log(`${location.pathname}${location.search}${location.hash}`);
        window.localStorage.setItem(
          "reval_redirectLocation",
          `${location.pathname}${location.search}${location.hash}`
        );
        return this.signIn();
      })
    );
  }

  signIn(): Promise<any> {
    return signInWithRedirect();
  }

  signOut(): Promise<any> {
    return signOut();
  }
}
