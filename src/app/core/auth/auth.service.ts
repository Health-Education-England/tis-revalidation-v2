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
  public cognitoIdToken: CognitoIdToken;
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
        this.cognitoIdToken = cognitoUserSession.getIdToken();
        this.userName = this.cognitoIdToken.payload[
          "custom:preferred_username"
        ];
        this.fullName = `${this.cognitoIdToken.payload.given_name} ${this.cognitoIdToken.payload.family_name}`;
        this.email = this.cognitoIdToken.payload.email;
        this.userDesignatedBodies = this.cognitoIdToken.payload[
          "cognito:groups"
        ];
        this.userRoles = this.cognitoIdToken.payload["cognito:roles"];
        this.inludesLondonDbcs = this.userDesignatedBodies.some((dbc: string) =>
          LONDON_DBCS.includes(dbc)
        );
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
