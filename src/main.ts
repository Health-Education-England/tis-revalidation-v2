import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Amplify } from "aws-amplify";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import {
  fetchAuthSession,
  signInWithRedirect,
  AuthSession,
  signOut
} from 'aws-amplify/auth';

const redirectKey = "reval_redirectLocation";
const location = window.location;

if (environment.production) {
  enableProdMode();
}

const AWS_CONFIG = {
  Auth: {
    Cognito: {
      userPoolId: environment.awsConfig.userPoolId,
      userPoolClientId: environment.awsConfig.userPoolWebClientId,
      mandatorySignIn: environment.awsConfig.mandatorySignIn,
      authenticationFlowType: environment.awsConfig.authenticationFlowType,
      loginWith: {
        oauth: {
          domain: environment.awsConfig.domain,
          scopes: environment.awsConfig.scope,
          redirectSignIn: environment.awsConfig.redirectSignIn,
          redirectSignOut: environment.awsConfig.redirectSignOut,
          responseType: environment.awsConfig.responseType as 'code' | 'token'
        }
      }
    }
  }
};

Amplify.configure(AWS_CONFIG);

fetchAuthSession()
  .then((cognitoUserSession: AuthSession) => {
    const cognitoIdToken = cognitoUserSession.tokens.idToken;
    const roles = cognitoIdToken.payload["cognito:roles"] as string[]|| [];

    if (roles.includes("HEE Admin Revalidation")) {
      platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err));
    } else {
      signOut();
      window.localStorage.removeItem(redirectKey);
      alert("Please contact administrator for access");
    }
  })
  .catch(() => {
    window.localStorage.setItem(
      redirectKey,
      `${location.pathname}${location.search}${location.hash}`
    );
    signInWithRedirect();
  });
