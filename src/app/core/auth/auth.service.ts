import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib-esm/types";
import { CognitoIdToken, CognitoUserSession } from "amazon-cognito-identity-js";
import { Auth, Cache } from "aws-amplify";
import { from, Observable, of } from "rxjs";
import { catchError, concatMap, delay, map, tap } from "rxjs/operators";
import { environment } from "@environment";
import { LONDON_DBCS } from "src/environments/constants";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public cognitoIdToken: CognitoIdToken;
  public userName = "";
  public email = "";
  public fullName = "";
  public userGroups: string[] = [];
  public userRoles: string[] = [];
  public userDesignatedBodies: string[] = [];
  public inludesLondonDbcs = false;

  constructor(private http: HttpClient) {}

  currentSession(): Observable<CognitoUserSession> {
    return from(Auth.currentSession()).pipe(
      tap((cognitoUserSession: CognitoUserSession) => {
        this.cognitoIdToken = cognitoUserSession.getIdToken();
        this.userName = this.cognitoIdToken.payload[
          "custom:preferred_username"
        ];
        this.fullName = `${this.cognitoIdToken.payload.given_name} ${this.cognitoIdToken.payload.family_name}`;
        this.email = this.cognitoIdToken.payload.email;
        this.userGroups = this.cognitoIdToken.payload["cognito:groups"];
        this.userRoles = this.cognitoIdToken.payload["cognito:roles"];
      }),
      concatMap((data: any) => {
        return this.getUserDBCs().pipe(
          tap((response: any) => {
            let dbcs = response[0].designatedBodyCodes;
            const inludesLondonDbcs = dbcs.some((dbc: string) =>
              LONDON_DBCS.includes(dbc)
            );

            if (inludesLondonDbcs) {
              dbcs = Array.from(new Set([...LONDON_DBCS, ...dbcs]));
            }

            this.inludesLondonDbcs = inludesLondonDbcs;
            this.userDesignatedBodies = dbcs;
          }),
          catchError((error: any) => {
            return of("Designated bodies not available");
          })
        );
      })
    );
  }

  /**
   * gets designated body codes
   */
  private getUserDBCs(): Observable<any> {
    return this.http.get<any>(environment.appUrls.getUserDesignatedBodies);
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
