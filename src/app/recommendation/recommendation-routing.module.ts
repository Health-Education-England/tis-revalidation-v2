import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConfirmRecommendationComponent } from "./confirm-recommendation/confirm-recommendation.component";
import { CreateRecommendationComponent } from "./create-recommendation/create-recommendation.component";
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
      },
      // TODO double check if a guard and/resolver is needed on this route
      {
        path: "create",
        component: CreateRecommendationComponent,
        data: { title: "Create recommendation" } // TODO double check if a guard is needed here
      },
      // TODO double check if a guard and/resolver is needed on this route
      {
        path: "confirm",
        component: ConfirmRecommendationComponent,
        data: { title: "Confirm recommendation" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendationRoutingModule {}
