// This file can be replaced during build by using the `fileReplacements` array.
import { AWS_CONFIG } from "./constants";
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { IEnvironment } from "./environment.interface";
export const environment: IEnvironment = {
  production: false,
  name: "dev",
  siteIds: ["UA-40570867-6"],
  hotJarId: 1662399,
  hotJarSv: 6,
  adminsUIHostUri: `https://dev-apps.tis.nhs.uk/`,
  supportLink: `https://teams.microsoft.com/l/channel/19%3ac7943c6ffa9c49b881304863bb39ff7b%40thread.skype/General?groupId=102f33a3-f794-4089-8c5a-68e04897e72e&tenantId=ffa7912b-b097-4131-9c0f-d0e80755b2ab`,
  dateFormat: "dd/MM/yyyy",
  appUrls: {
    // 665938a6-29d2-4199-a2d8-364f520b298c = 404 error
    // 0681fad7-c7b3-4543-83fa-dd4c3ed14e4a = 500 error
    // 5e997d8a33000062007b2354 = 21 recommendations
    // 5e997dba33000096297b235d = 0 recommendations to simulate no results found
    allocateAdmin: `api/v1/doctors/assignAdmin`, // TODO mock this
    authRedirect: ``,
    deleteFile: ``, // TODO mock this,
    downloadFile: ``, // TODO mock this
    getConcern: `mocky/0a459279-bdca-4b1b-9e07-d55c7f38630e`,
    getConcerns: `mocky/c25f77cf-594a-484b-b50b-562aa9438115?mocky-delay=700ms`,
    getConnections: `mocky/8e9b38d0-5d33-479e-bea7-e23b781b5c23?mocky-delay=700ms`,
    getDetails: `mocky/298f7e18-12d4-4e1b-9195-0bba7feb56b0`,
    getNotes: `mocky/45017692-2588-48dc-b6c2-c637cd723625`,
    getRecommendation: `mocky/6fd60c05-b4d0-462d-87a8-87402d57bd2e`,
    getRecommendations: `mocky/81267580-411e-4ce6-8dca-2f65f9d2e485?mocky-delay=700ms`,
    listAdmins: ``, // TODO mock this
    listFiles: ``, // TODO mock this
    login: ``,
    saveRecommendation: `api/recommendation`, // TODO mock this
    submitToGMC: `api/recommendation/{gmcId}/submit/{recommendationId}`, // TODO mock this
    upload: `mocky/c25f77cf-594a-484b-b50b-562aa9438115?mocky-delay=700ms` // TODO mock this
  },
  awsConfig: {
    ...AWS_CONFIG,
    bucketName: "tis-revalidation-concerns-upload-preprod",
    mandatorySignIn: true,
    redirectSignIn: "http://localhost:4200",
    redirectSignOut: "http://localhost:4200"
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
