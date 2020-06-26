import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { RecordsModule } from "../shared/records/records.module";
import { SharedModule } from "../shared/shared.module";
import { ConcernListComponent } from "./concern-list/concern-list.component";
import { ConcernsRoutingModule } from "./concerns-routing.module";
import { ConcernsComponent } from "./concerns.component";
import { ConcernsResolver } from "./concerns.resolver";
import { ConcernsState } from "./state/concerns.state";

@NgModule({
  declarations: [ConcernsComponent, ConcernListComponent],
  imports: [
    MaterialModule,
    SharedModule,
    RecordsModule,
    ConcernsRoutingModule,
    NgxsModule.forFeature([ConcernsState])
  ],
  providers: [ConcernsResolver]
})
export class ConcernsModule {}
