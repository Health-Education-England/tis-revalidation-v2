import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TraineesFilterComponent } from "./trainees-filter/trainees-filter.component";
import { TraineesSearchComponent } from "./trainees-search/trainees-search.component";
import { TraineesPaginatorComponent } from "./trainees-paginator/trainees-paginator.component";
import { TraineesListComponent } from "./trainees-list/trainees-list.component";
import { TraineesService } from "./trainees.service";
import { MaterialModule } from "../material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TraineeWarnPipePipe } from './trainee-warn-pipe.pipe';

const traineesComponents = [
  TraineesFilterComponent,
  TraineesSearchComponent,
  TraineesPaginatorComponent,
  TraineesListComponent
];

@NgModule({
  declarations: [...traineesComponents, TraineeWarnPipePipe],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [TraineesService],
  exports: [...traineesComponents]
})
export class TraineesModule {}
