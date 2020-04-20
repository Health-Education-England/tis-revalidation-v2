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

const AnalyticsConfigValue = new InjectionToken<AnalyticsConfig>(
  "AnalyticsConfig"
);

@NgModule({
  imports: [Angulartics2Module.forRoot()],
  providers: [{ provide: ErrorHandler, useClass: AnalyticsErrorHandler }]
})
export class AnalyticsModule {
  private googleScript: HTMLScriptElement;
  private gaScript: boolean;
  private win: any;

  constructor(
    private angulartics: Angulartics2GoogleAnalytics,
    @Optional() @SkipSelf() parentModule?: AnalyticsModule,
    @Inject(AnalyticsConfigValue) private analyticsConfig?: AnalyticsConfig,
    @Inject(DOCUMENT) private document?: Document
  ) {
    if (parentModule) {
      throw new Error(
        `AnalyticsModule is already loaded. Import it in the AppModule only`
      );
    }

    if (!analyticsConfig) {
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

  static forRoot(config: AnalyticsConfig): ModuleWithProviders {
    return {
      ngModule: AnalyticsModule,
      providers: [{ provide: AnalyticsConfigValue, useValue: config }]
    };
  }

  /**
   * Global site tag (ga) - Google Analytics
   */
  private injectGoogleScript(): void {
    if (!this.googleScript) {
      const googleSrc = `https://www.google-analytics.com/analytics.js`;
      this.googleScript = InjectScript(googleSrc, true, this.document);
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
      (this.win.ga = this.win.ga || gaFnc), (this.win.ga.l = +new Date());

      // set ga siteIds and track-mode to none on development auto in production
      const track = this.analyticsConfig.enabled ? "auto" : "none";
      this.analyticsConfig.siteId.every((siteId: string) => {
        this.win.ga("create", siteId, track);
      });
    }
  }
}
