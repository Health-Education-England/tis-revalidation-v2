import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

/**
 * Intercept all application errors and pass to GA for analysing
 */
@Injectable()
export class AnalyticsErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }
    handleError(error: any): void {
        const gtag = (window as any).gtag;
        if (gtag) {
            const angulartics: Angulartics2GoogleGlobalSiteTag = this.injector.get(Angulartics2GoogleGlobalSiteTag);
            const properties: any = { fatal: false, description: (error.message || error.stack || error) };
            angulartics.exceptionTrack(properties);
        }
        throw error;
    }
}
