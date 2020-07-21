import { ErrorHandler } from "@angular/core";
import * as Sentry from "@sentry/browser";
import { environment } from "src/environments/environment";

export class SentryErrorHandler implements ErrorHandler {
  constructor() {
    Sentry.init({
      dsn:
        "https://80334068f6354467ba7d59a42e9cecd8@o323095.ingest.sentry.io/5320173",
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
