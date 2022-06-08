import { APP_URLS_CONFIG, AWS_CONFIG } from "./constants";
import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
  production: false,
  name: "dev",
  siteIds: ["UA-40570867-6"],
  hotJarId: 1662399,
  hotJarSv: 6,
  adminsUIHostUri: `https://stage-apps.tis.nhs.uk/`,
  supportLink: `https://teams.microsoft.com/l/channel/19%3ac7943c6ffa9c49b881304863bb39ff7b%40thread.skype/General?groupId=102f33a3-f794-4089-8c5a-68e04897e72e&tenantId=ffa7912b-b097-4131-9c0f-d0e80755b2ab`,
  dateFormat: "dd/MM/yyyy",
  appUrls: APP_URLS_CONFIG,
  awsConfig: {
    ...AWS_CONFIG,
    bucketName: "tis-revalidation-concerns-upload-preprod",
    mandatorySignIn: false,
    redirectSignIn: "http://localhost:4200",
    redirectSignOut: "http://localhost:4200",
    userPoolId: "eu-west-2_o5Es6Bpl8",
    userPoolWebClientId: "r28c0u6jpc7scm9e2anhh274r",
    domain: "stage-auth.tis.nhs.uk",
    region: "eu-west-2"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import "zone.js/plugins/zone-error"; // Included with Angular CLI.
