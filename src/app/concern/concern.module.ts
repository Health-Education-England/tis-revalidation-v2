import { NgModule } from "@angular/core";
import { DetailsModule } from "../shared/details/details.module";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ConcernRoutingModule } from "./concern-routing.module";
import { ConcernComponent } from "./concern.component";
import { NgxsModule } from "@ngxs/store";
import { ConcernState } from "./state/concern.state";
import { ConcernsService } from "../concerns/services/concerns.service";
import { ConcernResolver } from "./concern.resolver";

@NgModule({
  declarations: [ConcernComponent],
  imports: [
    MaterialModule,
    SharedModule,
    ConcernRoutingModule,
    DetailsModule,
    NgxsModule.forFeature([ConcernState])
  ],
  providers: [ConcernsService, ConcernResolver]
})
export class ConcernModule {}
