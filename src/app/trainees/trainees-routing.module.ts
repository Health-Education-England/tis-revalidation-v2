import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TraineesComponent } from "./trainees.component";
import { TraineeListComponent } from "./trainee-list/trainee-list.component";

const routes: Routes = [
  {
    path: "trainees",
    component: TraineesComponent,
    data: { title: "Trainees" },
    children: [
      {
        path: "",
        component: TraineeListComponent,
        data: { title: "Trainee list" }
      },
      {
        path: "under-notice",
        component: TraineeListComponent,
        data: { title: "Trainees under-notice list" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineesRoutingModule {}
