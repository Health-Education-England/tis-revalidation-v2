// documentation here https://docs.amplify.aws/lib/auth/start/q/platform/js#re-use-existing-authentication-resource
import { environment } from "@environment";

export const AWS_CONFIG = {
  Auth: {
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
