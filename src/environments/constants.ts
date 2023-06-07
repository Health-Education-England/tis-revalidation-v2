import { IAWSConfig, IAppUrls } from "./environment.interface";

export const APP_URLS_CONFIG: IAppUrls = {
  addConcern: "api/concerns",
  addNote: "api/trainee/notes/add",
  allocateAdmin: `api/v1/doctors/assign-admin`,
  autocomplete: `api/v1/doctors/autocomplete`,
  deleteFile: `api/storage/delete`,
  downloadFile: `api/storage/download`,
  editNote: `api/trainee/notes/edit`,
  getConcern: `/api/concerns`,
  getConcerns: `api/concerns`,
  getConnections: `api/connection`,
  getDbcs: `api/reference/dbcs`,
  getDetails: `api/trainee`,
  getNotes: `mocky/5ea2da614f00006c00d9f540`,
  getRecommendation: `api/recommendation`,
  getRecommendations: `api/v1/doctors`,
  listAdmins: `api/admins`,
  listFiles: `api/storage/list`,
  saveRecommendation: `api/recommendation`,
  submitToGMC: `api/recommendation`,
  upload: `api/storage/upload`
};

export const AWS_CONFIG: IAWSConfig = {
  authenticationFlowType: "USER_PASSWORD_AUTH",
  bucketName: "",
  domain: "",
  mandatorySignIn: false,
  redirectSignIn: "",
  redirectSignOut: "",
  region: "eu-west-2",
  responseType: "code",
  scope: ["openid", "aws.cognito.signin.user.admin"],
  userPoolId: "",
  userPoolWebClientId: ""
};

export const ADMIN_ROLES = ["RevalApprover", "RevalAdmin"];

export const APPROVER_ROLES = ["RevalApprover"];

export const BETA_ROLES = ["RevalBeta"];
