export abstract class IEnvironment {
  abstract readonly production: boolean; // build mode
  abstract readonly siteIds: string[]; // Google analytics site id's
  abstract readonly hotJarId: number;
  abstract readonly hotJarSv: number;
  abstract readonly adminsUIHostUri: string; // admins-ui related links
  abstract readonly supportLink: string; // link to tis-support
  /**
   * Add api urls here as required
   */
  abstract readonly appUrls: {
    readonly login: string;
    readonly authRedirect: string;
    readonly getTrainees: string;
  };
}
