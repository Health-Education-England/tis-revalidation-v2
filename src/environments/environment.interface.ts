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
    readonly login: string;
    readonly authRedirect: string;
    readonly getTrainees: string;
    readonly getRecommendation: string;
    readonly getNotes: string;
  };
}
