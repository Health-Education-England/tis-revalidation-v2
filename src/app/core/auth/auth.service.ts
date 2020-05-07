import { Injectable } from "@angular/core";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "node_modules/@aws-amplify/auth/lib-esm/Auth";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  currentSession(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
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
