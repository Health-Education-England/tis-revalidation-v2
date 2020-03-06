import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "@environment";
import { AnalyticsModule, HotJarModule } from "hee-shared";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
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
    NgxsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
