import { commonEnv } from "./environment.common";
import { IEnvironment } from "./environment.interface";

const env: Partial<IEnvironment> = {
  name: "prod",
  production: true,
  adminsUIHostUri: "https://apps.tis.nhs.uk/",
  gtmID: "GTM-MLTQS7XR",
  awsConfig: {
    bucketName: "tis-revalidation-concerns-upload-prod",
    domain: "tis-prod.auth.eu-west-2.amazoncognito.com",
    userPoolId: "eu-west-2_6g9Rz2m0r",
    userPoolWebClientId: "503a0fda33b8ndblni35cf4ba6",
    redirectSignIn: "https://revalidation.tis.nhs.uk",
    redirectSignOut: "https://revalidation.tis.nhs.uk"
  }
};
export const environment = {
  ...commonEnv,
  ...env,
  awsConfig: { ...commonEnv.awsConfig, ...env.awsConfig }
};
