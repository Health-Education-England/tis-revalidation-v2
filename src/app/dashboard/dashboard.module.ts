import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { UnderNoticeState } from "./under-notice/state/under-notice.state";
import { UnderNoticeComponent } from "./under-notice/under-notice.component";
import { MaterialModule } from "../shared/material/material.module";

@NgModule({
  declarations: [DashboardComponent, UnderNoticeComponent],
  imports: [
    MaterialModule,
    SharedModule,
    DashboardRoutingModule,
    NgxsModule.forFeature([UnderNoticeState])
  ]
})
export class DashboardModule {}
