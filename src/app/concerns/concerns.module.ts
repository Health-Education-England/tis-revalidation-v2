import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { RecordsModule } from "../shared/records/records.module";
import { SharedModule } from "../shared/shared.module";
import { ConcernListComponent } from "./concern-list/concern-list.component";
import { ConcernsRoutingModule } from "./concerns-routing.module";
import { ConcernsComponent } from "./concerns.component";
import { ConcernsState } from "./state/concerns.state";

@NgModule({
  declarations: [ConcernsComponent, ConcernListComponent],
  imports: [
    RecordsModule,
    MaterialModule,
    SharedModule,
    ConcernsRoutingModule,
    NgxsModule.forFeature([ConcernsState])
  ]
})
export class ConcernsModule {}
