import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConcernsComponent } from "./concerns.component";

const routes: Routes = [
  {
    path: "",
    component: ConcernsComponent,
    data: { title: "Concerns list" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcernsRoutingModule {}
