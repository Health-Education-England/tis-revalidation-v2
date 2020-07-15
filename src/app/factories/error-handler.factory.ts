import { ErrorHandler } from "@angular/core";
import * as Sentry from "@sentry/browser";
import { environment } from "src/environments/environment";

export class SentryErrorHandler implements ErrorHandler {
  constructor() {
    Sentry.init({
      dsn: "https://2e7ac4b21a544f158c46b4320e7cfd45@sentry.io/5320173",
      environment: environment.name
    } as Sentry.BrowserOptions);
  }

  handleError(error) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

export function errorHandlerFactory() {
  if (environment.production) {
    return new SentryErrorHandler();
  } else {
    return new ErrorHandler();
  }
}
