import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MaterialModule } from "../shared/material/material.module";
import { TraineeSummaryComponent } from "./trainee-summary/trainee-summary.component";
import { RevalidationHistoryComponent } from "./revalidation-history/revalidation-history.component";
import { RevalidationNotesComponent } from "./revalidation-notes/revalidation-notes.component";
import { RevalidationFormComponent } from "./revalidation-form/revalidation-form.component";

@NgModule({
  declarations: [
    DashboardComponent,
    TraineeSummaryComponent,
    RevalidationHistoryComponent,
    RevalidationNotesComponent,
    RevalidationFormComponent
  ],
  imports: [MaterialModule, SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
