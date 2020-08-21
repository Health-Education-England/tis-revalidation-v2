import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecordsComponent } from "../records/records.component";
import { ConcernsResolver } from "./concerns.resolver";

const routes: Routes = [
  {
    path: "",
    component: RecordsComponent,
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
