import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { TraineesState } from "./state/trainees.state";
import { TraineeListComponent } from "./trainee-list/trainee-list.component";
import { TraineesRoutingModule } from "./trainees-routing.module";
import { TraineesComponent } from "./trainees.component";

@NgModule({
  declarations: [TraineesComponent, TraineeListComponent],
  imports: [
    MaterialModule,
    SharedModule,
    TraineesRoutingModule,
    NgxsModule.forFeature([TraineesState])
  ]
})
export class TraineesModule {}
