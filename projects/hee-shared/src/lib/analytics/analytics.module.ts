import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
  Inject,
  InjectionToken,
  ErrorHandler
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Angulartics2Module } from "angulartics2";
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";
import { AnalyticsErrorHandler } from "./analytics.errorhandler";
import { InjectScript } from "../utilities.functions";

export interface AnalyticsConfig {
  siteId: string[];
  enabled: boolean;
}

export const AnalyticsConfigValue = new InjectionToken<AnalyticsConfig>(
  "AnalyticsConfig"
);

export const GoogleURI = `https://www.google-analytics.com/analytics.js`;

@NgModule({
  imports: [Angulartics2Module.forRoot()],
  providers: [{ provide: ErrorHandler, useClass: AnalyticsErrorHandler }]
})
export class AnalyticsModule {
  public get googleScript(): HTMLScriptElement {
    return this.document.head.querySelector(`script[src^="${GoogleURI}"]`);
  }
  private gaScript: boolean;
  private win: any;

  constructor(
    private angulartics: Angulartics2GoogleAnalytics,
    @Optional() @SkipSelf() private parentModule?: AnalyticsModule,
    @Inject(AnalyticsConfigValue) private analyticsConfig?: AnalyticsConfig,
    @Inject(DOCUMENT) private document?: Document
  ) {
    this.initilialise();
  }

  static forRoot(
    config: AnalyticsConfig = null
  ): ModuleWithProviders<AnalyticsModule> {
    return {
      ngModule: AnalyticsModule,
      providers: [{ provide: AnalyticsConfigValue, useValue: config }]
    };
  }

  public initilialise(): void {
    if (this.googleScript) {
      this.googleScript.remove();
    }

    if (this.parentModule) {
      throw new Error(
        `AnalyticsModule is already loaded. Import it in the AppModule only`
      );
    }

    if (!this.analyticsConfig) {
      throw new Error(
        `AnalyticsModule requires forRoot({ siteId: [string array of site id's], enabled: true|false })`
      );
    }

    if (
      this.analyticsConfig &&
      this.analyticsConfig.enabled &&
      this.analyticsConfig.siteId
    ) {
      if (this.analyticsConfig.enabled) {
        this.win = window as any;
        this.angulartics.settings.additionalAccountNames = this.analyticsConfig.siteId;
        this.initializeGa();
        this.injectGoogleScript();
        this.angulartics.startTracking();
      }
    }
  }

  /**
   * Global site tag (ga) - Google Analytics
   */
  private injectGoogleScript(): void {
    if (!this.googleScript) {
      InjectScript(GoogleURI, true, this.document);
    }
  }

  /**
   * Initialize window.ga object and function for tracking
   */
  private initializeGa(): void {
    if (!this.gaScript && typeof this.win.ga === "undefined") {
      this.gaScript = true;

      this.win.GoogleAnalyticsObject = "ga";
      const gaFnc = (...args: any) => {
        (window as any).ga.q = (window as any).ga.q || [];
        (window as any).ga.q.push(args);
      };
      this.win.ga = this.win.ga || gaFnc;
      this.win.ga.l = +new Date();

      // set ga siteIds and track-mode to none on development auto in production
      const track = this.analyticsConfig.enabled ? "auto" : "none";
      for (const siteId of this.analyticsConfig.siteId) {
        this.win.ga("create", siteId, track);
      }
    }
  }
}
