import { IEnvironment } from "./environment.interface";

export const APP_URLS_CONFIG: IEnvironment["appUrls"] = {
  allocateAdmin: `api/v1/doctors/assign-admin`,
  authRedirect: ``,
  deleteFile: `api/storage/delete`,
  downloadFile: `api/storage/download`,
  getConcern: `/api/concerns`,
  getConcerns: `api/concerns`,
  getConnections: `api/v1/connections`,
  getDetails: `api/trainee`,
  getNotes: `mocky/5ea2da614f00006c00d9f540`, // TODO replace with appropriate api url once is available
  getRecommendation: `api/recommendation`,
  getRecommendations: `api/v1/doctors`,
  listFiles: `api/storage/list`,
  login: ``,
  saveRecommendation: `api/recommendation`,
  submitToGMC: `api/recommendation/{gmcNumber}/submit/{recommendationId}`,
  upload: `api/storage/upload`
};

export const AWS_CONFIG: IEnvironment["awsConfig"] = {
  accessKeyId: "AKIAWISJGQ6JUF3LSWMO",
  authenticationFlowType: "USER_PASSWORD_AUTH",
  bucketName: "",
  domain: "stage-auth.tis.nhs.uk",
  mandatorySignIn: null,
  redirectSignIn: "",
  redirectSignOut: "",
  region: "eu-west-2",
  responseType: "token",
  scope: ["openid", "aws.cognito.signin.user.admin"],
  secretAccessKey: "hriPPZQppD+5DM02iE+wVX1+jOCUyXkqK34Fzfl4",
  userPoolId: "eu-west-2_J8SoC9e1Y",
  userPoolWebClientId: "23mvi31orrlq04ugap61mor8bg"
};
