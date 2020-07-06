import { IEnvironment } from "./environment.interface";

export const APP_URLS_CONFIG: IEnvironment["appUrls"] = {
  authRedirect: ``,
  getConcerns: `api/concerns`,
  getConcern: `/api/concerns`,
  getConnections: `api/v1/connections`,
  getDetails: `api/trainee`,
  getNotes: `mocky/5ea2da614f00006c00d9f540`, // TODO replace with appropriate api url once is available
  getRecommendation: `api/recommendation`,
  getRecommendations: `api/v1/doctors`,
  login: ``,
  saveRecommendation: `api/recommendation`,
  submitToGMC: `api/recommendation/{gmcNumber}/submit/{recommendationId}`,
  uploadConcernDocuments: ``
};

export const AWS_CONFIG: IEnvironment["awsConfig"] = {
  accessKeyId: "AKIAWISJGQ6JUF3LSWMO",
  authenticationFlowType: "USER_PASSWORD_AUTH",
  domain: "stage-auth.tis.nhs.uk",
  mandatorySignIn: null,
  redirectSignIn: "",
  redirectSignOut: "",
  region: "eu-west-2",
  responseType: "token",
  scope: ["openid", "aws.cognito.signin.user.admin"],
  secretAccessKey: "hriPPZQppD+5DM02iE+wVX1+jOCUyXkqK34Fzfl4",
  userPoolId: "eu-west-2_hkwYIoHu3",
  userPoolWebClientId: "3adscm2usl3lop510nfijpr12f"
};
