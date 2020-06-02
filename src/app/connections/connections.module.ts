import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ConnectionListComponent } from "./connection-list/connection-list.component";
import { ConnectionsRoutingModule } from "./connections-routing.module";
import { ConnectionsComponent } from "./connections.component";
import { ConnectionsState } from "./state/connections.state";

@NgModule({
  declarations: [ConnectionsComponent, ConnectionListComponent],
  imports: [
    MaterialModule,
    SharedModule,
    ConnectionsRoutingModule,
    NgxsModule.forFeature([ConnectionsState])
  ]
})
export class ConnectionsModule {}
