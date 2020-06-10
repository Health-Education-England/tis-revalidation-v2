import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailsModule } from "../shared/details/details.module";

import { TraineeRoutingModule } from "./trainee-routing.module";
import { TraineeComponent } from "./trainee.component";
import { RevalidationHistoryComponent } from "./revalidation-history/revalidation-history.component";
import { RevalidationNotesComponent } from "./revalidation-notes/revalidation-notes.component";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { NgxsModule } from "@ngxs/store";
import { TraineeResolver } from "./trainee.resolver";
import { RevalidationHistoryState } from "./state/revalidation-history.state";
import { RevalidationHistoryService } from "./services/revalidation-history.service";
import { RevalidationNotesState } from "./state/revalidation-notes.state";
import { TraineeDetailsComponent } from "./trainee-details/trainee-details.component";
import { RevalidationTableComponent } from "./revalidation-table/revalidation-table.component";

@NgModule({
  declarations: [
    TraineeComponent,
    RevalidationHistoryComponent,
    RevalidationNotesComponent,
    TraineeDetailsComponent,
    RevalidationTableComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    DetailsModule,
    CommonModule,
    TraineeRoutingModule,
    NgxsModule.forFeature([RevalidationHistoryState]),
    NgxsModule.forFeature([RevalidationNotesState])
  ],
  providers: [RevalidationHistoryService, TraineeResolver]
})
export class TraineeModule {}
