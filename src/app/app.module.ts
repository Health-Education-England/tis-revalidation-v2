import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, APP_INITIALIZER, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  ServiceWorkerModule,
  SwRegistrationOptions
} from "@angular/service-worker";

import { NgxsModule, Store } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { Router } from "@angular/router";

import { ReferenceModule } from "./reference/reference.module";

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

import { swRegistrationOptionsFactory } from "./factories/sw-registration-options.factory";

import { GetDesignatedBodies } from "./reference/state/reference.actions";
import { ReferenceState } from "./reference/state/reference.state";
import { GoogleTagManagerModule } from "angular-google-tag-manager";
import { environment } from "@environment";
import { AnnouncementsComponent } from "./announcements/announcements.component";
import { ContentfulDocumentToHtmlPipe } from "./shared/pipes/contentful-document-to-html.pipe";
@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsComponent,
    ContentfulDocumentToHtmlPipe
  ],
  imports: [
    ReferenceModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js"),
    NgxsModule.forRoot([ReferenceState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MainNavigationModule,
    GoogleTagManagerModule.forRoot({
      id: environment.gtmID
    })
  ],
  exports: [ContentfulDocumentToHtmlPipe],
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

    { provide: SwRegistrationOptions, useFactory: swRegistrationOptionsFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private store: Store) {
    this.store.dispatch(new GetDesignatedBodies());
  }
}
