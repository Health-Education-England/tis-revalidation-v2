import { NgModule } from "@angular/core";
import { DetailsModule } from "../shared/details/details.module";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ConcernRoutingModule } from "./concern-routing.module";
import { ConcernComponent } from "./concern.component";

@NgModule({
  declarations: [ConcernComponent],
  imports: [MaterialModule, SharedModule, ConcernRoutingModule, DetailsModule]
})
export class ConcernModule {}
