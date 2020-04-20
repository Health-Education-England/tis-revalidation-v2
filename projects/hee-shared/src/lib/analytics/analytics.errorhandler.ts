import { Injectable, ErrorHandler, Injector } from "@angular/core";
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";

/**
 * Intercept all application errors and pass to GA for analyzing
 */
@Injectable()
export class AnalyticsErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}
  handleError(error: any): void {
    const ga = (window as any).ga;
    if (ga) {
      const angulartics: Angulartics2GoogleAnalytics = this.injector.get(
        Angulartics2GoogleAnalytics
      );
      const properties: any = {
        fatal: false,
        description: error.message || error.stack || error
      };
      angulartics.exceptionTrack(properties);
    }
    throw error;
  }
}
