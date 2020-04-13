import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "@environment";
import { NgxsModule } from "@ngxs/store";
import { AnalyticsModule, HotJarModule } from "hee-shared";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./shared/material/material.module";
import { MainNavigationModule } from "./shared/main-navigation/main-navigation.module";
import { LoadingSpinnerModule } from "./loading-spinner/loading-spinner.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    LoadingSpinnerModule,
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
