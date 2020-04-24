import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TraineeComponent } from "./trainee.component";
import { RevalidationHistoryComponent } from "./revalidation-history/revalidation-history.component";
import { TraineeResolver } from "./trainee.resolver";

const routes: Routes = [
  {
    path: "",
    component: TraineeComponent,
    data: { title: "Trainee summary" },
    children: [
      {
        path: "",
        component: RevalidationHistoryComponent,
        data: { title: "Revalidation history" },
        resolve: { trainee: TraineeResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeRoutingModule {}
