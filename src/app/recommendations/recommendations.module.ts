import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { RecommendationsState } from "./state/recommendations.state";
import { RecommendationsRoutingModule } from "./recommendations-routing.module";
import { TraineesModule } from "../shared/trainees/trainees.module";
import { RecommendationsResolver } from "./recommendations.resolver";
import { RecommendationsService } from "./services/recommendations.service";
import { RecommendationsComponent } from "./recommendations.component";

@NgModule({
  declarations: [RecommendationsComponent],
  imports: [
    MaterialModule,
    SharedModule,
    TraineesModule,
    RecommendationsRoutingModule,
    NgxsModule.forFeature([RecommendationsState])
  ],
  providers: [RecommendationsResolver, RecommendationsService]
})
export class RecommendationsModule {}
