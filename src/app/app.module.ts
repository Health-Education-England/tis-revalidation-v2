import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, APP_INITIALIZER, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  ServiceWorkerModule,
  SwRegistrationOptions
} from "@angular/service-worker";
import { NgxsModule } from "@ngxs/store";
import { Router } from "@angular/router";

import { ReferenceModule } from "./reference/reference.module";
import {
  AnalyticsModule,
  HotJarModule,
  AnalyticsConfigValue,
  HotJarConfigValue
} from "hee-shared";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpErrorInterceptor } from "./core/http-error/http-error.interceptor";
import { MainNavigationModule } from "./shared/main-navigation/main-navigation.module";
import { MaterialModule } from "./shared/material/material.module";
import { SharedModule } from "./shared/shared.module";
import { AuthInterceptor } from "./core/auth/auth.interceptor";
import { AuthService } from "./core/auth/auth.service";
import { initializeApplication } from "./core/auth/auth.initializer";
import { errorHandlerFactory } from "./factories/error-handler.factory";
import { analyticsConfigFactory } from "./factories/google-analytics-config.factory";
import { hotjarConfigFactory } from "./factories/hotjar-config.factory";
import { swRegistrationOptionsFactory } from "./factories/sw-registration-options.factory";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";

@NgModule({
  declarations: [AppComponent],
  imports: [
    ReferenceModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js"),
    AnalyticsModule.forRoot(),
    HotJarModule.forRoot(),
    NgxsModule.forRoot([]),
    NgxsLoggerPluginModule.forRoot(),
    MainNavigationModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApplication,
      multi: true,
      deps: [AuthService, Router]
    },
    { provide: ErrorHandler, useFactory: errorHandlerFactory },
    { provide: AnalyticsConfigValue, useFactory: analyticsConfigFactory },
    { provide: HotJarConfigValue, useFactory: hotjarConfigFactory },
    { provide: SwRegistrationOptions, useFactory: swRegistrationOptionsFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
