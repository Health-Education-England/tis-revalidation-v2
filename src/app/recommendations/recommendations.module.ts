import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { RecordsModule } from "../records/records.module";
import { SharedModule } from "../shared/shared.module";
import { RecommendationsResolver } from "./recommendations.resolver";
import { RecommendationsState } from "./state/recommendations.state";
import { RecommendationsListComponent } from "./recommendations-list/recommendations-list.component";
import { RecommendationsRoutingModule } from "./recommendations-routing.module";
import { RecommendationsComponent } from "./recommendations.component";
import { RecommendationsListPaginatorComponent } from "./recommendations-list-paginator/recommendations-list-paginator.component";
import { RecommendationsFiltersComponent } from "./recommendations-filters/recommendations-filters.component";
@NgModule({
  declarations: [
    RecommendationsComponent,
    RecommendationsListComponent,
    RecommendationsListPaginatorComponent,
    RecommendationsFiltersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RecordsModule,
    RecommendationsRoutingModule,
    NgxsModule.forFeature([RecommendationsState])
  ],
  providers: [RecommendationsResolver]
})
export class RecommendationsModule {}
