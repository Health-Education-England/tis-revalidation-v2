import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecommendationsComponent } from "./recommendations.component";
import { RecommendationsResolver } from "./recommendations.resolver";

const routes: Routes = [
  {
    path: "",
    component: RecommendationsComponent,
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
