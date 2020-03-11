export abstract class IEnvironment {
  abstract readonly production: boolean; // build mode
  abstract readonly siteIds: string[]; // Google analytics site id's
  abstract readonly host: string; // api proxy host
  /**
   * Add api urls here as required
   */
  abstract readonly appUrls: {
    readonly login: string;
    readonly authRedirect: string;
    readonly getUnderNoticeTrainees: string;
  };
}
