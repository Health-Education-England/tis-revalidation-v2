import { IEnvironment } from "./environment.interface";

export const environment = {
  production: true,
  name: "prod",
  siteIds: ["UA-40570867-6"],
  hotJarId: 3168055,
  hotJarSv: 6,
  adminsUIHostUri: "https://apps.tis.nhs.uk/",
  supportLink:
    "https://teams.microsoft.com/l/channel/19%3ac7943c6ffa9c49b881304863bb39ff7b%40thread.skype/General?groupId=102f33a3-f794-4089-8c5a-68e04897e72e&tenantId=ffa7912b-b097-4131-9c0f-d0e80755b2ab",
  dateFormat: "dd/MM/yyyy",
  awsConfig: {
    domain: "auth.tis.nhs.uk",
    region: "eu-west-2",
    scope: ["openid", "aws.cognito.signin.user.admin"],
    authenticationFlowType: "USER_PASSWORD_AUTH",
    responseType: "code",
    userPoolId: "eu-west-2_r3l1XtMDD",
    userPoolWebClientId: "4o37rm9tbid1u066hr500be5n3",
    bucketName: "tis-revalidation-concerns-upload-prod",
    mandatorySignIn: true,
    redirectSignIn: "https://revalidation.tis.nhs.uk",
    redirectSignOut: "https://revalidation.tis.nhs.uk"
  }
};
