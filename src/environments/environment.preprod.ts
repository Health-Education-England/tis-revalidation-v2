import { commonEnv } from "./environment.common";
import { IEnvironment } from "./environment.interface";

const env: Partial<IEnvironment> = {
  name: "stage",
  production: true,
  siteIds: ["UA-40570867-6"],
  hotJarId: 1980924,

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
