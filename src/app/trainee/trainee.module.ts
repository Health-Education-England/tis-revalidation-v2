import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TraineeRoutingModule } from "./trainee-routing.module";
import { TraineeComponent } from "./trainee.component";
import { RevalidationHistoryComponent } from "./revalidation-history/revalidation-history.component";
import { RevalidationFormComponent } from "./revalidation-form/revalidation-form.component";
import { RevalidationNotesComponent } from "./revalidation-notes/revalidation-notes.component";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    TraineeComponent,
    RevalidationHistoryComponent,
    RevalidationFormComponent,
    RevalidationNotesComponent
  ],
  imports: [MaterialModule, SharedModule, CommonModule, TraineeRoutingModule]
})
export class TraineeModule {}
