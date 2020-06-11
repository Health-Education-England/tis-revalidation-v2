import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { RecommendationsState } from "./state/recommendations.state";
import { RecommendationsListComponent } from "./recommendations-list/recommendations-list.component";
import { RecommendationsRoutingModule } from "./recommendations-routing.module";
import { RecommendationsComponent } from "./recommendations.component";
import { ResetRecommendationsListComponent } from "./reset-recommendations-list/reset-recommendations-list.component";
import { RecommendationsListPaginatorComponent } from "./recommendations-list-paginator/recommendations-list-paginator.component";
import { RecommendationsSearchComponent } from "./recommendations-search/recommendations-search.component";
import { RecommendationsFiltersComponent } from "./recommendations-filters/recommendations-filters.component";
@NgModule({
  declarations: [
    RecommendationsComponent,
    RecommendationsListComponent,
    ResetRecommendationsListComponent,
    RecommendationsListPaginatorComponent,
    RecommendationsSearchComponent,
    RecommendationsFiltersComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    RecommendationsRoutingModule,
    NgxsModule.forFeature([RecommendationsState])
  ],
  providers: []
})
export class RecommendationsModule {}
