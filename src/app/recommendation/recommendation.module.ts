import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DetailsModule } from "../details/details.module";

import { RecommendationRoutingModule } from "./recommendation-routing.module";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { NgxsModule } from "@ngxs/store";
import { RecommendationResolver } from "./recommendation.resolver";
import { RecommendationHistoryState } from "./state/recommendation-history.state";
import { RecommendationHistoryService } from "./services/recommendation-history.service";
import { RecommendationNotesState } from "./state/recommendation-notes.state";
import { RecommendationTableComponent } from "./recommendation-table/recommendation-table.component";
import { RecommendationNotesComponent } from "./recommendation-notes/recommendation-notes.component";
import { CreateRecommendationComponent } from "./create-recommendation/create-recommendation.component";
import { ConfirmRecommendationComponent } from "./confirm-recommendation/confirm-recommendation.component";
import { UnderNoticeGuard } from "./guards/under-notice.gaurd";
import { NotSubmittedGuard } from "./guards/not-submitted.guard";
import { AdminsModule } from "../admins/admins.module";

@NgModule({
  declarations: [
    RecommendationNotesComponent,
    RecommendationTableComponent,
    CreateRecommendationComponent,
    ConfirmRecommendationComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    DetailsModule,
    CommonModule,
    RecommendationRoutingModule,
    AdminsModule,
    NgxsModule.forFeature([RecommendationHistoryState]),
    NgxsModule.forFeature([RecommendationNotesState])
  ],
  providers: [
    RecommendationHistoryService,
    RecommendationResolver,
    UnderNoticeGuard,
    NotSubmittedGuard
  ]
})
export class RecommendationModule {}
