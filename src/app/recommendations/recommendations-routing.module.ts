import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecordsComponent } from "../records/records.component";
import { RecommendationsResolver } from "./recommendations.resolver";

const routes: Routes = [
  {
    path: "",
    component: RecordsComponent,
    data: { title: "Recommendations list" },
    resolve: { recommendations: RecommendationsResolver },
    runGuardsAndResolvers: "always"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendationsRoutingModule {}
