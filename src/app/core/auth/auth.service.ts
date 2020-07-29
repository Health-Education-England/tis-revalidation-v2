import { Injectable } from "@angular/core";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "../../../../node_modules/@aws-amplify/auth/lib/types";
import { CognitoUserSession, CognitoIdToken } from "amazon-cognito-identity-js";
import { Observable, from } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public cognitoIdToken: CognitoIdToken;
  public userName = "";
  public email = "";
  public userGroups: string[] = [];
  public userRoles: string[] = [];
  private identityProvider = CognitoHostedUIIdentityProvider;

  constructor() {}

  currentSession(): Observable<CognitoUserSession> {
    return from(Auth.currentSession()).pipe(
      tap((cognitoUserSession: CognitoUserSession) => {
        this.cognitoIdToken = cognitoUserSession.getIdToken();
        this.userName = this.cognitoIdToken.payload["cognito:username"];
        this.email = this.cognitoIdToken.payload.email;
        this.userGroups = this.cognitoIdToken.payload["cognito:groups"];
        this.userRoles = this.cognitoIdToken.payload["cognito:roles"];
      })
    );
  }

  signIn(): Promise<any> {
    return Auth.federatedSignIn({
      provider: this.identityProvider.Cognito
    });
  }

  signOut(): Promise<any> {
    return Auth.signOut({ global: true });
  }
}
