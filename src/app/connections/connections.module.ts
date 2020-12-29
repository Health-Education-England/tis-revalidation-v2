import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { ReactiveFormsModule } from "@angular/forms";

import { AdminsModule } from "../admins/admins.module";
import { MaterialModule } from "../shared/material/material.module";
import { RecordsModule } from "../records/records.module";
import { ConnectionsRoutingModule } from "./connections-routing.module";
import { UpdateConnectionsModule } from "../update-connections/update-connections.module";
import { ConnectionsResolver } from "./connections.resolver";
import { ConnectionsState } from "./state/connections.state";
import { ConnectionsComponent } from "./connections.component";

@NgModule({
  declarations: [ConnectionsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AdminsModule,
    RecordsModule,
    ConnectionsRoutingModule,
    ReactiveFormsModule,
    UpdateConnectionsModule,
    NgxsModule.forFeature([ConnectionsState])
  ],
  providers: [ConnectionsResolver]
})
export class ConnectionsModule {}
