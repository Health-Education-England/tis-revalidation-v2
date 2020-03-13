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
import { MainNavComponent } from "./main-nav/main-nav.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMainNavComponent } from "./mat-main-nav/mat-main-nav.component";

import { HttpClientModule } from "@angular/common/http";
import { StatusBarComponent } from "./mat-main-nav/status-bar/status-bar.component";
import { MobileMenuComponent } from "./mat-main-nav/mobile-menu/mobile-menu.component";
import { DesktopMenuComponent } from "./mat-main-nav/desktop-menu/desktop-menu.component";
import { MaterialModule } from "./shared/material/material.module";

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MatMainNavComponent,
    StatusBarComponent,
    MobileMenuComponent,
    DesktopMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    AnalyticsModule.forRoot({
      siteId: ["UA-40570867-6"],
      enabled: environment.production
    }),
    HotJarModule.forRoot({
      hotJarId: 1662399,
      hotJarSv: 6,
      enabled: environment.production
    }),
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
