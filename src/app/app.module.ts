import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "@environment";
import { NgxsModule } from "@ngxs/store";
import Amplify from "aws-amplify";
import { AnalyticsModule, HotJarModule } from "hee-shared";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AWS_CONFIG } from "./core/auth/aws-config";
import { MainNavigationModule } from "./shared/main-navigation/main-navigation.module";
import { MaterialModule } from "./shared/material/material.module";
import { SharedModule } from "./shared/shared.module";

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
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    MainNavigationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
