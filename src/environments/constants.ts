import { IEnvironment } from "./environment.interface";

export const APP_URLS_CONFIG: IEnvironment["appUrls"] = {
  authRedirect: ``,
  getConcerns: `api/concerns`,
  getConnections: `api/v1/connections`,
  getDetails: `api/trainee`,
  getNotes: `mocky/5ea2da614f00006c00d9f540`, // TODO replace with appropriate api url once is available
  getRecommendation: `api/recommendation`,
  getRecommendations: `api/v1/doctors`,
  login: ``,
  saveRecommendation: `api/recommendation`,
  submitToGMC: `api/recommendation/{gmcNumber}/submit/{recommendationId}`
};
