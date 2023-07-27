import { commonEnv } from "./environment.common";
import { IEnvironment } from "./environment.interface";

const env: Partial<IEnvironment> = {
  name: "stage",
  production: true,
  gtmID: "GTM-W6V88JMC",
  awsConfig: {
    redirectSignIn: "https://stage-revalidation.tis.nhs.uk",
    redirectSignOut: "https://stage-revalidation.tis.nhs.uk"
  }
};

export const environment = {
  ...commonEnv,
  ...env,
  awsConfig: { ...commonEnv.awsConfig, ...env.awsConfig }
};
