import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxsModule } from "@ngxs/store";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { UnderNoticeState } from "./under-notice/state/under-notice.state";
import { UnderNoticeComponent } from "./under-notice/under-notice.component";

@NgModule({
  declarations: [DashboardComponent, UnderNoticeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxsModule.forFeature([UnderNoticeState])
  ]
})
export class DashboardModule {}
