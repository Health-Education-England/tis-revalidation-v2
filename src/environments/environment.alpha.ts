import { commonEnv } from "./environment.common";
import { IEnvironment } from "./environment.interface";

const env: Partial<IEnvironment> = {
  name: "alpha",
  production: true,
  gtmID: "GTM-WFRHL895",
  awsConfig: {
    domain: "tis-preprod.auth.eu-west-2.amazoncognito.com",
    userPoolId: "eu-west-2_sNYQvAsaG",
    userPoolWebClientId: "12apcktrr55idvu3hdhga9p1e5",
    redirectSignIn: "https://alpha-revalidation.tis.nhs.uk",
    redirectSignOut: "https://alpha-revalidation.tis.nhs.uk"
  }
};

export const environment = {
  ...commonEnv,
  ...env,
  awsConfig: { ...commonEnv.awsConfig, ...env.awsConfig }
};
