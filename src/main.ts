import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Amplify, Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib-esm/types";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { AppModule } from "./app/app.module";
import { environment as defaultEnvironment } from "./environments/environment";

fetch("/api/environment")
  .then((response) => response.json())
  .then((envName) => initializeApplication(envName.name))
  .catch(() => initializeApplication());

async function initializeApplication(envName: string = "") {
  const response = await fetch("./assets/environments/environment.json");
  const overloadEnvironments = await response.json();
  const redirectKey = "reval_redirectLocation";
  const location = window.location;

  if (
    !location.origin.includes("localhost") &&
    envName.length > 0 &&
    overloadEnvironments &&
    overloadEnvironments[envName]
  ) {
    const overloadEnvironment = overloadEnvironments[envName];

    Object.keys(overloadEnvironment).forEach((key) => {
      if (
        defaultEnvironment.hasOwnProperty(key) &&
        !Array.isArray(defaultEnvironment[key])
      ) {
        defaultEnvironment[key] = overloadEnvironment[key];
      }
    });
  }

  if (defaultEnvironment.production) {
    enableProdMode();
  }

  const AWS_CONFIG = {
    Auth: {
      region: defaultEnvironment.awsConfig.region,
      userPoolId: defaultEnvironment.awsConfig.userPoolId,
      userPoolWebClientId: defaultEnvironment.awsConfig.userPoolWebClientId,
      authenticationFlowType:
        defaultEnvironment.awsConfig.authenticationFlowType,
      mandatorySignIn: defaultEnvironment.awsConfig.mandatorySignIn,
      oauth: {
        domain: defaultEnvironment.awsConfig.domain,
        scope: defaultEnvironment.awsConfig.scope,
        redirectSignIn: defaultEnvironment.awsConfig.redirectSignIn,
        redirectSignOut: defaultEnvironment.awsConfig.redirectSignOut,
        responseType: defaultEnvironment.awsConfig.responseType
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
}
