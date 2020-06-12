import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecommendationComponent } from "./recommendation.component";
import { RecommendationHistoryComponent } from "./recommendation-history/recommendation-history.component";
import { RecommendationResolver } from "./recommendation.resolver";

const routes: Routes = [
  {
    path: "",
    component: RecommendationComponent,
    data: { title: "Recommendation summary" },
    children: [
      {
        path: "",
        component: RecommendationHistoryComponent,
        data: { title: "Recommendation history" },
        resolve: { recommendation: RecommendationResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendationRoutingModule {}
