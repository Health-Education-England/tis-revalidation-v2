import { IEnvironment } from "./environment.interface";
import { APP_URLS_CONFIG, AWS_CONFIG } from "./constants";

export const environment: IEnvironment = {
  production: true,
  name: "prod",
  siteIds: ["UA-40570867-6"],
  hotJarId: 3168055,
  hotJarSv: 6,
  adminsUIHostUri: "https://apps.tis.nhs.uk/",
  supportLink:
    "https://teams.microsoft.com/l/channel/19%3ac7943c6ffa9c49b881304863bb39ff7b%40thread.skype/General?groupId=102f33a3-f794-4089-8c5a-68e04897e72e&tenantId=ffa7912b-b097-4131-9c0f-d0e80755b2ab",
  dateFormat: "dd/MM/yyyy",
  appUrls: APP_URLS_CONFIG,
  londonDBCs: [
    {
      key: "ADD_NEW_DBC_CODE_HERE",
      value: "Kent, Surrey and Sussex"
    },
    {
      key: "ADD_NEW_DBC_CODE_HERE",
      value: "North Central and East London"
    },
    { key: "ADD_NEW_DBC_CODE_HERE", value: "North West London" },
    { key: "ADD_NEW_DBC_CODE_HERE", value: "South London" }
  ],
  awsConfig: {
    ...AWS_CONFIG,
    bucketName: "tis-revalidation-concerns-upload-prod",
    domain: "auth.tis.nhs.uk",
    mandatorySignIn: true,
    redirectSignIn: "https://revalidation.tis.nhs.uk",
    redirectSignOut: "https://revalidation.tis.nhs.uk",
    userPoolId: "eu-west-2_r3l1XtMDD",
    userPoolWebClientId: "4o37rm9tbid1u066hr500be5n3"
  }
};
