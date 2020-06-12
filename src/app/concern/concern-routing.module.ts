import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConcernComponent } from "./concern.component";

const routes: Routes = [
  {
    path: "",
    component: ConcernComponent,
    data: { title: "Concern summary" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcernRoutingModule {}
