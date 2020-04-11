import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TraineesRoutingModule } from "./trainees-routing.module";
import { TraineesComponent } from "./trainees.component";
import { TraineesListComponent } from "./trainees-list/trainees-list.component";
import { NgxsModule } from "@ngxs/store";
import { TraineesState } from "./state/trainees.state";
import { TraineesService } from "./trainees.service";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { TraineeSummaryComponent } from "./trainee-summary/trainee-summary.component";
import { RevalidationHistoryComponent } from "./revalidation-history/revalidation-history.component";
import { RevalidationNotesComponent } from "./revalidation-notes/revalidation-notes.component";
import { RevalidationFormComponent } from "./revalidation-form/revalidation-form.component";

@NgModule({
  declarations: [
    TraineesComponent,
    TraineesListComponent,
    TraineeSummaryComponent,
    RevalidationHistoryComponent,
    RevalidationNotesComponent,
    RevalidationFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    TraineesRoutingModule,
    NgxsModule.forFeature([TraineesState])
  ],
  providers: [TraineesService]
})
export class TraineesModule {}
