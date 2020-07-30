import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { RecordsModule } from "../records/records.module";
import { SharedModule } from "../shared/shared.module";
import { ConnectionListComponent } from "./connection-list/connection-list.component";
import { ConnectionsRoutingModule } from "./connections-routing.module";
import { ConnectionsComponent } from "./connections.component";
import { ConnectionsResolver } from "./connections.resolver";
import { ConnectionsState } from "./state/connections.state";

@NgModule({
  declarations: [ConnectionsComponent, ConnectionListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RecordsModule,
    ConnectionsRoutingModule,
    NgxsModule.forFeature([ConnectionsState])
  ],
  providers: [ConnectionsResolver]
})
export class ConnectionsModule {}
