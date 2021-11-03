import { IEnvironment } from "./environment.interface";

export const APP_URLS_CONFIG: IEnvironment["appUrls"] = {
  addConcern: "api/concerns",
  addNote: "api/trainee/notes/add",
  allocateAdmin: `api/v1/doctors/assign-admin`,
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

export const AWS_CONFIG: IEnvironment["awsConfig"] = {
  authenticationFlowType: "USER_PASSWORD_AUTH",
  responseType: "token",
  scope: ["openid", "aws.cognito.signin.user.admin"],
  mandatorySignIn: null,
  bucketName: "",
  domain: "",
  redirectSignIn: "",
  redirectSignOut: "",
  region: "",
  userPoolId: "",
  userPoolWebClientId: ""
};

export const LONDON_DBCS: string[] = [
  "1-AIIDWA",
  "1-AIIDVS",
  "1-AIIDWI",
  "1-AIIDR8"
];

export const ADMIN_ROLES = [
  "RevalSuperAdmin",
  "RevalApprover",
  "RevalAdmin"
];

export const APPROVER_ROLES = [
  "RevalApprover"
];
