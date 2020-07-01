export abstract class IEnvironment {
  abstract readonly production: boolean; // build mode
  abstract readonly siteIds: string[]; // Google analytics site id's
  abstract readonly hotJarId: number;
  abstract readonly hotJarSv: number;
  abstract readonly adminsUIHostUri: string; // admins-ui related links
  abstract readonly supportLink: string; // link to tis-support
  abstract readonly dateFormat: string; // TODO: when implementing i18n localization use value from locale
  /**
   * Add api urls here as required
   */
  abstract readonly appUrls: {
    readonly authRedirect: string;
    readonly getConcerns: string;
    readonly getConcern: string;
    readonly getConnections: string;
    readonly getNotes: string;
    readonly getRecommendation: string;
    readonly getRecommendations: string;
    readonly login: string;
    readonly saveRecommendation: string;
    readonly submitToGMC: string;
    readonly getDetails: string;
  };

  abstract readonly awsConfig: {
    readonly region: string;
    readonly userPoolId: string;
    readonly userPoolWebClientId: string;
    readonly authenticationFlowType: string;
    readonly domain: string;
    readonly scope: string[];
    readonly redirectSignIn: string;
    readonly redirectSignOut: string;
    readonly responseType: string;
    readonly mandatorySignIn: boolean;
    readonly accessKeyId: string;
    readonly secretAccessKey: string;
  };
}
