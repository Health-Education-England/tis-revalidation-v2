export abstract class IEnvironment {
  abstract readonly adminsUIHostUri: string; // admins-ui related links
  abstract readonly dateFormat: string; // TODO: when implementing i18n localization use value from locale
  abstract readonly hotJarId: number;
  abstract readonly hotJarSv: number;
  abstract readonly name: string; // environment name
  abstract readonly production: boolean; // build mode
  abstract readonly siteIds: string[]; // Google analytics site id's
  abstract readonly supportLink: string; // link to tis-support
  /**
   * Add api urls here as required
   */
  abstract readonly appUrls: {
    readonly allocateAdmin: string;
    readonly authRedirect: string;
    readonly fileDownload: string;
    readonly fileList: string;
    readonly fileUpload: string;
    readonly getConcern: string;
    readonly getConcerns: string;
    readonly getConnections: string;
    readonly getDetails: string;
    readonly getNotes: string;
    readonly getRecommendation: string;
    readonly getRecommendations: string;
    readonly login: string;
    readonly saveRecommendation: string;
    readonly submitToGMC: string;
  };

  abstract readonly awsConfig: {
    readonly accessKeyId: string;
    readonly authenticationFlowType: string;
    readonly domain: string;
    readonly mandatorySignIn: boolean;
    readonly redirectSignIn: string;
    readonly redirectSignOut: string;
    readonly region: string;
    readonly responseType: string;
    readonly scope: string[];
    readonly secretAccessKey: string;
    readonly userPoolId: string;
    readonly userPoolWebClientId: string;
  };
}
