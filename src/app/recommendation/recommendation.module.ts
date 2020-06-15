import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailsModule } from "../shared/details/details.module";

import { RecommendationRoutingModule } from "./recommendation-routing.module";
import { RecommendationComponent } from "./recommendation.component";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { NgxsModule } from "@ngxs/store";
import { RecommendationResolver } from "./recommendation.resolver";
import { RecommendationHistoryState } from "./state/recommendation-history.state";
import { RecommendationHistoryService } from "./services/recommendation-history.service";
import { RecommendationNotesState } from "./state/recommendation-notes.state";
import { RecommendationTableComponent } from "./recommendation-table/recommendation-table.component";
import { RecommendationHistoryComponent } from "./recommendation-history/recommendation-history.component";
import { RecommendationNotesComponent } from "./recommendation-notes/recommendation-notes.component";

@NgModule({
  declarations: [
    RecommendationComponent,
    RecommendationHistoryComponent,
    RecommendationNotesComponent,
    RecommendationTableComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    DetailsModule,
    CommonModule,
    RecommendationRoutingModule,
    NgxsModule.forFeature([RecommendationHistoryState]),
    NgxsModule.forFeature([RecommendationNotesState])
  ],
  providers: [RecommendationHistoryService, RecommendationResolver]
})
export class RecommendationModule {}