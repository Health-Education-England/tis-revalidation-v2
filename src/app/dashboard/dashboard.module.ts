import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { UnderNoticeComponent } from "./under-notice/under-notice.component";

@NgModule({
  declarations: [DashboardComponent, UnderNoticeComponent],
  imports: [CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
