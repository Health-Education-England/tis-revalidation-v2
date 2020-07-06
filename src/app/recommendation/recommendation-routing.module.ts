import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecordDetailsComponent } from "../shared/details/record-details/record-details.component";
import { ConfirmRecommendationComponent } from "./confirm-recommendation/confirm-recommendation.component";
import { CreateRecommendationComponent } from "./create-recommendation/create-recommendation.component";
import { RecommendationTableComponent } from "./recommendation-table/recommendation-table.component";
import { RecommendationResolver } from "./recommendation.resolver";
import { UnderNoticeGuard } from "./guards/under-notice.gaurd";
import { NotSubmittedGuard } from "./guards/not-submitted.guard";

const routes: Routes = [
  {
    path: "",
    component: RecordDetailsComponent,
    data: { title: "Recommendation summary" },
    resolve: { recommendation: RecommendationResolver },
    children: [
      {
        path: "",
        component: RecommendationTableComponent,
        data: { title: "Recommendation history", showNotes: false }
      },
      {
        path: "create",
        component: CreateRecommendationComponent,
        data: {
          title: "Create recommendation",
          showToolbar: true,
          showNotes: false
        },
        canActivate: [UnderNoticeGuard]
      },
      {
        path: "edit",
        component: CreateRecommendationComponent,
        data: {
          title: "Edit recommendation",
          showToolbar: true,
          showNotes: false
        },
        canActivate: [UnderNoticeGuard, NotSubmittedGuard]
      },
      {
        path: "confirm",
        component: ConfirmRecommendationComponent,
        data: { title: "Confirm recommendation", showNotes: false },
        canActivate: [UnderNoticeGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendationRoutingModule {}
