import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { AdminsModule } from "../admins/admins.module";
import { MaterialModule } from "../shared/material/material.module";
import { RecordsModule } from "../records/records.module";
import { RecommendationsResolver } from "./recommendations.resolver";
import { RecommendationsState } from "./state/recommendations.state";
import { RecommendationsRoutingModule } from "./recommendations-routing.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RecordsModule,
    AdminsModule,
    RecommendationsRoutingModule,
    NgxsModule.forFeature([RecommendationsState])
  ],
  providers: [RecommendationsResolver]
})
export class RecommendationsModule {}
