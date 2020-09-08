import { APP_URLS_CONFIG, AWS_CONFIG } from "./constants";
import { IEnvironment } from "./environment.interface";
export const environment: IEnvironment = {
  production: true,
  name: "prod",
  siteIds: ["UA-40570867-6"],
  hotJarId: 1980924,
  hotJarSv: 6,
  adminsUIHostUri: `https://apps.tis.nhs.uk/`,
  supportLink: `https://teams.microsoft.com/l/channel/19%3ac7943c6ffa9c49b881304863bb39ff7b%40thread.skype/General?groupId=102f33a3-f794-4089-8c5a-68e04897e72e&tenantId=ffa7912b-b097-4131-9c0f-d0e80755b2ab`,
  dateFormat: "dd/MM/yyyy",
  appUrls: APP_URLS_CONFIG,
  // TODO add correct prod values below
  awsConfig: {
    ...AWS_CONFIG,
    bucketName: "tis-revalidation-concerns-upload-preprod",
    mandatorySignIn: true,
    redirectSignIn: "https://revalidation.tis.nhs.uk",
    redirectSignOut: "https://revalidation.tis.nhs.uk"
  }
};
