import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LoadingSpinnerService } from "./loading-spinner.service";
import { tap, finalize } from "rxjs/operators";

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
  /**
   * ignore list for http requests to not show the loading spinner
   * Example keep-alive services, registration get user details, error logging services etc
   * add api endpoints here
   */
  private loadingSpinnerIgnore: string[] = [];
  private activeUrls: string[] = [];

  private checkIgnoreList(url: string): boolean {
    this.loadingSpinnerIgnore.forEach((element) => {
      if (element.indexOf(url) > -1) {
        return true;
      }
    });
    return false;
  }
  constructor(private spinnerService: LoadingSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const ignore = this.checkIgnoreList(request.url);
    if (ignore) {
      return next.handle(request);
    } else {
      return next.handle(request).pipe(
        tap((event) => {
          if (this.activeUrls.length === 0) {
            this.spinnerService.show();
          }
          if (this.activeUrls.indexOf(request.url) === -1) {
            this.activeUrls.push(request.url);
          }
        }),

        finalize(() => {
          this.activeUrls = this.activeUrls.filter((e) => e !== request.url);
          if (this.activeUrls.length === 0) {
            this.spinnerService.hide();
          }
        })
      );
    }
  }
}
