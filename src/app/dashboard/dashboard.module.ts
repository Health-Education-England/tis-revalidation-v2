import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { UnderNoticeState } from "./under-notice/state/under-notice.state";
import { UnderNoticeComponent } from "./under-notice/under-notice.component";
import { MaterialModule } from "../shared/material/material.module";
import { TraineeSummaryComponent } from "./trainee-summary/trainee-summary.component";
import { RevalidationHistoryComponent } from "./revalidation-history/revalidation-history.component";
import { RevalidationNotesComponent } from "./revalidation-notes/revalidation-notes.component";
import { RevalidationFormComponent } from "./revalidation-form/revalidation-form.component";

@NgModule({
  declarations: [
    DashboardComponent,
    UnderNoticeComponent,
    TraineeSummaryComponent,
    RevalidationHistoryComponent,
    RevalidationNotesComponent,
    RevalidationFormComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    DashboardRoutingModule,
    NgxsModule.forFeature([UnderNoticeState])
  ]
})
export class DashboardModule {}
