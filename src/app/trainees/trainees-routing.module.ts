import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TraineesComponent } from "./trainees.component";
import { TraineesResolver } from "./trainees.resolver";

const routes: Routes = [
  {
    path: "",
    component: TraineesComponent,
    data: { title: "Trainees list" },
    resolve: { data: TraineesResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineesRoutingModule {}
