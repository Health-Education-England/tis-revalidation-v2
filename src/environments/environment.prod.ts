import { commonEnv } from "./environment.common";
import { IEnvironment } from "./environment.interface";

const env: Partial<IEnvironment> = {
  name: "prod",
  production: true,
  adminsUIHostUri: "https://apps.tis.nhs.uk/",
  gtmID: "GTM-MLTQS7XR",
  awsConfig: {
    bucketName: "tis-revalidation-concerns-upload-prod",
    domain: "auth.tis.nhs.uk",
    redirectSignIn: "https://revalidation.tis.nhs.uk",
    redirectSignOut: "https://revalidation.tis.nhs.uk",
    userPoolId: "eu-west-2_r3l1XtMDD",
    userPoolWebClientId: "4o37rm9tbid1u066hr500be5n3"
  }
};
export const environment = {
  ...commonEnv,
  ...env,
  awsConfig: { ...commonEnv.awsConfig, ...env.awsConfig }
};
