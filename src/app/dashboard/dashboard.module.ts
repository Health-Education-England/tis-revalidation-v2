import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { UnderNoticeState } from "./under-notice/state/under-notice.state";
import { UnderNoticeComponent } from "./under-notice/under-notice.component";

@NgModule({
  declarations: [DashboardComponent, UnderNoticeComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    NgxsModule.forFeature([UnderNoticeState])
  ]
})
export class DashboardModule {}
