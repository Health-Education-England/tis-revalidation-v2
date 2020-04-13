import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from "../shared/material/material.module";
import { LoadingSpinnerService } from "./loading-spinner.service";
import { LoadingSpinnerInterceptor } from "./loading-spinner.interceptor";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule],
  providers: [
    LoadingSpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingSpinnerInterceptor,
      multi: true
    }
  ]
})
export class LoadingSpinnerModule {
  constructor(
    private router: Router,
    private spinnerService: LoadingSpinnerService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.spinnerService.hide();
      }
    });
  }
}
