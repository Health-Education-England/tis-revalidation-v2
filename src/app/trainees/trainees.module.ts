import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { TraineesState } from "./state/trainees.state";
import { TraineeListComponent } from "./trainee-list/trainee-list.component";
import { TraineesRoutingModule } from "./trainees-routing.module";
import { TraineesComponent } from "./trainees.component";
import { ResetTraineeListComponent } from "./reset-trainee-list/reset-trainee-list.component";
import { TraineeListPaginatorComponent } from "./trainee-list-paginator/trainee-list-paginator.component";
import { TraineeSearchComponent } from "./trainee-search/trainee-search.component";
import { TraineeFiltersComponent } from "./trainee-filters/trainee-filters.component";
@NgModule({
  declarations: [
    TraineesComponent,
    TraineeListComponent,
    ResetTraineeListComponent,
    TraineeListPaginatorComponent,
    TraineeSearchComponent,
    TraineeFiltersComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    TraineesRoutingModule,
    NgxsModule.forFeature([TraineesState])
  ],
  providers: []
})
export class TraineesModule {}
