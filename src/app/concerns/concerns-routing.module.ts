import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConcernsComponent } from "./concerns.component";
import { ConcernsResolver } from "./concerns.resolver";

const routes: Routes = [
  {
    path: "",
    component: ConcernsComponent,
    data: { title: "Concerns list" },
    resolve: { concerns: ConcernsResolver },
    runGuardsAndResolvers: "always"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcernsRoutingModule {}
