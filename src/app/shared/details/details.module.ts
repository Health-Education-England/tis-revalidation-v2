import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { DetailsSideNavComponent } from "./details-side-nav/details-side-nav.component";
import { DetailsSideNavService } from "./details-side-nav/service/details-side-nav.service";
import { NgxsModule } from "@ngxs/store";
import { DetailsSideNavState } from "./details-side-nav/state/details-side-nav.state";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "src/app/core/auth/auth.interceptor";
import { RecordDetailsComponent } from "./record-details/record-details.component";

@NgModule({
  // TODO double check if NavBarComponent, DetailsSideNavComponent
  // are needed to be imported and/or exported as the RecordDetailsComponent
  // already encapsulate both of them
  declarations: [NavBarComponent, DetailsSideNavComponent, RecordDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    NgxsModule.forFeature([DetailsSideNavState])
  ],
  providers: [
    DetailsSideNavService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [NavBarComponent, DetailsSideNavComponent, RecordDetailsComponent]
})
export class DetailsModule {}
