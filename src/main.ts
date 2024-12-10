import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Amplify, Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib-esm/types";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

const redirectKey = "reval_redirectLocation";
const location = window.location;

if (environment.production) {
  enableProdMode();
}

const AWS_CONFIG = {
  Auth: {
    storage: window.sessionStorage,
    region: environment.awsConfig.region,
    userPoolId: environment.awsConfig.userPoolId,
    userPoolWebClientId: environment.awsConfig.userPoolWebClientId,
    authenticationFlowType: environment.awsConfig.authenticationFlowType,
    mandatorySignIn: environment.awsConfig.mandatorySignIn,
    oauth: {
      domain: environment.awsConfig.domain,
      scope: environment.awsConfig.scope,
      redirectSignIn: environment.awsConfig.redirectSignIn,
      redirectSignOut: environment.awsConfig.redirectSignOut,
      responseType: environment.awsConfig.responseType
    }
  }
};

Amplify.configure(AWS_CONFIG);

Auth.currentSession()
  .then((cognitoUserSession: CognitoUserSession) => {
    const cognitoIdToken = cognitoUserSession.getIdToken();
    const roles = cognitoIdToken.payload["cognito:roles"];

    if (roles.includes("HEE Admin Revalidation")) {
      platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err));
    } else {
      Auth.signOut();
      window.localStorage.removeItem(redirectKey);
      alert("Please contact administrator for access");
    }
  })
  .catch(() => {
    window.localStorage.setItem(
      redirectKey,
      `${location.pathname}${location.search}${location.hash}`
    );
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Cognito
    });
  });
