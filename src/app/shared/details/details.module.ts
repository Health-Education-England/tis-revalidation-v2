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

@NgModule({
  declarations: [NavBarComponent, DetailsSideNavComponent],
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
  exports: [NavBarComponent, DetailsSideNavComponent]
})
export class DetailsModule {}
