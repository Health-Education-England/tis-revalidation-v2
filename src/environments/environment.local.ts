// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { IEnvironment } from "./environment.interface";
export const environment: IEnvironment = {
  production: false,
  siteIds: ["UA-40570867-6"],
  hotJarId: 1662399,
  hotJarSv: 6,
  adminsUIHostUri: `https://dev-apps.tis.nhs.uk/`,
  supportLink: `https://teams.microsoft.com/l/channel/19%3ac7943c6ffa9c49b881304863bb39ff7b%40thread.skype/General?groupId=102f33a3-f794-4089-8c5a-68e04897e72e&tenantId=ffa7912b-b097-4131-9c0f-d0e80755b2ab`,
  dateFormat: "dd/MM/yyyy",
  appUrls: {
    login: ``,
    authRedirect: ``,
    getTrainees: `api/v1/doctors`,
    getConcerns: `api/v1/concerns`,
    getRecommendation: `mocky/5ea6d31b2f00004e00c4e7d9`,
    getNotes: `mocky/5ea2da614f00006c00d9f540`
  },
  awsConfig: {
    userPoolWebClientId: "3adscm2usl3lop510nfijpr12f",
    authenticationFlowType: "USER_PASSWORD_AUTH",
    domain: "stage-auth.tis.nhs.uk",
    scope: ["openid", "aws.cognito.signin.user.admin"],
    redirectSignIn: "http://localhost:4200",
    redirectSignOut: "http://localhost:4200",
    responseType: "token",
    region: "eu-west-2",
    userPoolId: "eu-west-2_hkwYIoHu3",
    mandatorySignIn: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import "zone.js/dist/zone-error"; // Included with Angular CLI.
