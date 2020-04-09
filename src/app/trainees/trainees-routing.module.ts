import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TraineesComponent } from "./trainees.component";

const routes: Routes = [
  {
    path: "trainees",
    component: TraineesComponent,
    data: { title: "Trainees list" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineesRoutingModule {}
