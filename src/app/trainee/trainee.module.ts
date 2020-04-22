import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TraineeRoutingModule } from "./trainee-routing.module";
import { TraineeComponent } from "./trainee.component";
import { RevalidationHistoryComponent } from "./revalidation-history/revalidation-history.component";
import { RevalidationFormComponent } from "./revalidation-form/revalidation-form.component";
import { RevalidationNotesComponent } from "./revalidation-notes/revalidation-notes.component";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { NgxsModule } from "@ngxs/store";
import { TraineeResolver } from "./trainee.resolver";
import { RevalidationHistoryState } from "./state/revalidation-history.state";
import { RevalidationHistoryService } from "./services/revalidation-history.service";
import { RevalidationNotesState } from "./state/revalidation-notes.state";

@NgModule({
  declarations: [
    TraineeComponent,
    RevalidationHistoryComponent,
    RevalidationFormComponent,
    RevalidationNotesComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
    TraineeRoutingModule,
    NgxsModule.forFeature([RevalidationHistoryState]),
    NgxsModule.forFeature([RevalidationNotesState])
  ],
  providers: [RevalidationHistoryService, TraineeResolver]
})
export class TraineeModule {}
