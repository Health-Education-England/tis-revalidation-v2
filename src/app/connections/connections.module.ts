import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { AdminsModule } from "../admins/admins.module";
import { MaterialModule } from "../shared/material/material.module";
import { RecordsModule } from "../records/records.module";
import { ConnectionsRoutingModule } from "./connections-routing.module";
import { ConnectionsResolver } from "./connections.resolver";
import { ConnectionsState } from "./state/connections.state";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AdminsModule,
    RecordsModule,
    ConnectionsRoutingModule,
    NgxsModule.forFeature([ConnectionsState])
  ],
  providers: [ConnectionsResolver]
})
export class ConnectionsModule {}
