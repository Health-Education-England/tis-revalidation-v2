import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, APP_INITIALIZER, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "@environment";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsModule } from "@ngxs/store";
import Amplify from "aws-amplify";
import { AnalyticsModule, HotJarModule } from "hee-shared";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AWS_CONFIG } from "./core/auth/aws-config";
import { HttpErrorInterceptor } from "./core/http-error/http-error.interceptor";
import { AdminsState } from "./admins/state/admins.state";
import { MainNavigationModule } from "./shared/main-navigation/main-navigation.module";
import { MaterialModule } from "./shared/material/material.module";
import { SharedModule } from "./shared/shared.module";
import { AuthInterceptor } from "./core/auth/auth.interceptor";
import { AuthService } from "./core/auth/auth.service";
import { initializeApplication } from "./core/auth/auth.initializer";
import { errorHandlerFactory } from "./factories/error-handler.factory";
import { Router } from "@angular/router";

/* Configure Amplify resources */
Amplify.configure(AWS_CONFIG);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    AnalyticsModule.forRoot({
      siteId: environment.siteIds,
      enabled: environment.production
    }),
    HotJarModule.forRoot({
      hotJarId: environment.hotJarId,
      hotJarSv: environment.hotJarSv,
      enabled: environment.production
    }),
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
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
    { provide: ErrorHandler, useFactory: errorHandlerFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
