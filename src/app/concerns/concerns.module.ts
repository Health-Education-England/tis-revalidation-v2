import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ConcernsRoutingModule } from "./concerns-routing.module";
import { ConcernsComponent } from "./concerns.component";
import { ConcernsState } from "./state/concerns.state";
import { ConcernsService } from "./services/concerns.service";
import { TraineesModule } from "../shared/trainees/trainees.module";
import { ConcernsResolver } from "./concerns.resolver";

@NgModule({
  declarations: [ConcernsComponent],
  imports: [
    MaterialModule,
    SharedModule,
    TraineesModule,
    ConcernsRoutingModule,
    NgxsModule.forFeature([ConcernsState])
  ],
  providers: [ConcernsResolver, ConcernsService]
})
export class ConcernsModule {}
