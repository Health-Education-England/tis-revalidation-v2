import { APP_URLS_CONFIG, AWS_CONFIG } from "./constants";
import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
  production: true,
  name: "stage",
  siteIds: ["UA-40570867-6"],
  hotJarId: 1980924,
  hotJarSv: 6,
  adminsUIHostUri: "https://stage-apps.tis.nhs.uk/",
  supportLink:
    "https://teams.microsoft.com/l/channel/19%3ac7943c6ffa9c49b881304863bb39ff7b%40thread.skype/General?groupId=102f33a3-f794-4089-8c5a-68e04897e72e&tenantId=ffa7912b-b097-4131-9c0f-d0e80755b2ab",
  dateFormat: "dd/MM/yyyy",
  appUrls: APP_URLS_CONFIG,
  londonDBCs: [
    {
      key: "1-AIIDR8",
      value: "Kent, Surrey and Sussex"
    },
    {
      key: "1-AIIDVS",
      value: "North Central and East London"
    },
    { key: "1-AIIDWA", value: "North West London" },
    { key: "1-AIIDWI", value: "South London" }
  ],

  awsConfig: {
    ...AWS_CONFIG,

    domain: "stage-auth.tis.nhs.uk",
    bucketName: "tis-revalidation-concerns-upload-preprod",
    mandatorySignIn: true,
    redirectSignIn: "https://stage-revalidation.tis.nhs.uk",
    redirectSignOut: "https://stage-revalidation.tis.nhs.uk",
    userPoolId: "eu-west-2_o5Es6Bpl8",
    userPoolWebClientId: "r28c0u6jpc7scm9e2anhh274r"
  }
};
