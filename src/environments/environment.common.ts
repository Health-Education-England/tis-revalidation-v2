import { APP_URLS_CONFIG, AWS_CONFIG } from "./constants";
import { IEnvironment } from "./environment.interface";

export const commonEnv: IEnvironment = {
  production: false,
  appVersion: require("../../package.json").version,
  name: "dev",
  siteIds: ["UA-40570867-6"],
  gtmID: "GTM-WFRHL895",
  adminsUIHostUri: `https://stage-apps.tis.nhs.uk/`,
  supportLink: `https://teams.microsoft.com/l/channel/19%3ac7943c6ffa9c49b881304863bb39ff7b%40thread.skype/General?groupId=102f33a3-f794-4089-8c5a-68e04897e72e&tenantId=ffa7912b-b097-4131-9c0f-d0e80755b2ab`,
  dateFormat: "dd/MM/yyyy",
  dateTimeFormat: "dd/MM/yyyy HH:mm:ss",
  appUrls: APP_URLS_CONFIG,
  londonDBCs: [
    {
      key: "1-1RUZV1D",
      value: "Kent, Surrey and Sussex"
    },
    {
      key: "1-1RUZV4H",
      value: "North Central and East London"
    },
    { key: "1-1RUZV6H", value: "North West London" },
    { key: "1-1RSSQ5L", value: "South London" }
  ],
  awsConfig: {
    ...AWS_CONFIG,
    bucketName: "tis-revalidation-concerns-upload-preprod",
    domain: "tis-local.auth.eu-west-2.amazoncognito.com",
    mandatorySignIn: true,
    redirectSignIn: ["http://localhost:4200"],
    redirectSignOut: ["http://localhost:4200"],
    userPoolId: "eu-west-2_Hc4ETnUXM",
    userPoolWebClientId: "5bp1jqpo2nklag4hpkebqk6r8d"
  }
};
