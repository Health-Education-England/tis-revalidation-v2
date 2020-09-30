import { Injectable } from "@angular/core";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib-esm/types";
import { CognitoIdToken, CognitoUserSession } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import { from, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LONDON_DBCS } from "src/environments/constants";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public userName = "";
  public email = "";
  public fullName = "";
  public userRoles: string[] = [];
  public userDesignatedBodies: string[] = [];
  public inludesLondonDbcs = false;

  constructor() {}

  currentSession(): Observable<CognitoUserSession> {
    return from(Auth.currentSession()).pipe(
      tap((cognitoUserSession: CognitoUserSession) => {
        const cognitoIdToken = cognitoUserSession.getIdToken();

        this.userName = cognitoIdToken.payload["custom:preferred_username"];
        this.fullName = `${cognitoIdToken.payload.given_name} ${cognitoIdToken.payload.family_name}`;
        this.email = cognitoIdToken.payload.email;
        this.userRoles = cognitoIdToken.payload["cognito:roles"];

        let dbcs: string[] = cognitoIdToken.payload["cognito:groups"];
        this.inludesLondonDbcs = dbcs.some((dbc) => LONDON_DBCS.includes(dbc));

        if (this.inludesLondonDbcs) {
          dbcs = Array.from(new Set([...LONDON_DBCS, ...dbcs]));
        }
        this.userDesignatedBodies = dbcs;
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
