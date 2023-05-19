import { commonEnv } from "./environment.common";
import { IEnvironment } from "./environment.interface";

const env: Partial<IEnvironment> = {
  name: "alpha",
  production: true,
  hotJarId: "3498835",
  awsConfig: {
    redirectSignIn: "https://alpha-revalidation.tis.nhs.uk",
    redirectSignOut: "https://alpha-revalidation.tis.nhs.uk"
  }
};

export const environment = {
  ...commonEnv,
  ...env,
  awsConfig: { ...commonEnv.awsConfig, ...env.awsConfig }
};
