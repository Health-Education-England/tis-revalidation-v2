import { NgModule } from "@angular/core";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ConcernRoutingModule } from "./concern-routing.module";
import { ConcernComponent } from "./concern.component";

@NgModule({
  declarations: [ConcernComponent],
  imports: [MaterialModule, SharedModule, ConcernRoutingModule]
})
export class ConcernModule {}
