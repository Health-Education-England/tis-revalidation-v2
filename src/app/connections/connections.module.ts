import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ConnectionsRoutingModule } from "./connections-routing.module";
import { ConnectionsComponent } from "./connections.component";
import { ConnectionsState } from "./state/connections.state";
import { ConnectionsService } from "./services/connections.service";
import { TraineesModule } from "../shared/trainees/trainees.module";
import { ConnectionsResolver } from "./connections.resolver";

@NgModule({
  declarations: [ConnectionsComponent],
  imports: [
    MaterialModule,
    SharedModule,
    TraineesModule,
    ConnectionsRoutingModule,
    NgxsModule.forFeature([ConnectionsState])
  ],
  providers: [ConnectionsService, ConnectionsResolver]
})
export class ConnectionsModule {}
