export interface IEnvironment {
  readonly adminsUIHostUri: string; // admins-ui related links
  readonly dateFormat: string; // TODO: when implementing i18n localization use value from locale
  readonly gtmID: string;
  readonly name: string; // environment name
  readonly production: boolean; // build mode
  readonly siteIds: string[]; // Google analytics site id's
  readonly supportLink: string; // link to tis-support
  readonly appUrls: IAppUrls;
  readonly londonDBCs: IKeyValue[];
  readonly awsConfig: Partial<IAWSConfig>;
}

export interface IAWSConfig {
  readonly authenticationFlowType: string;
  readonly bucketName: string;
  readonly domain: string;
  readonly mandatorySignIn: boolean;
  readonly redirectSignIn: string;
  readonly redirectSignOut: string;
  readonly region: string;
  readonly responseType: string;
  readonly scope: string[];
  readonly userPoolId: string;
  readonly userPoolWebClientId: string;
}

export interface IAppUrls {
  readonly addConcern: string;
  readonly addNote: string;
  readonly allocateAdmin: string;
  readonly autocomplete: string;
  readonly deleteFile: string;
  readonly downloadFile: string;
  readonly editNote: string;
  readonly getConcern: string;
  readonly getConcerns: string;
  readonly getConnections: string;
  readonly getDbcs: string;
  readonly getDetails: string;
  readonly getNotes: string;
  readonly getRecommendation: string;
  readonly getRecommendations: string;
  readonly listAdmins: string;
  readonly listFiles: string;
  readonly saveRecommendation: string;
  readonly submitToGMC: string;
  readonly upload: string;
}

export interface IKeyValue {
  key: string;
  value: string;
}
