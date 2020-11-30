import { CommonModule } from "@angular/common";
import { MaterialModule } from "../shared/material/material.module";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";

import { DetailsModule } from "../details/details.module";
import { AdminsModule } from "../admins/admins.module";
import { UpdateConnectionsModule } from "../update-connections/update-connections.module";
import { SharedModule } from "../shared/shared.module";
import { ConnectionComponent } from "./connection.component";
import { ConnectionRoutingModule } from "./connection-routing.module";
import { ConnectionResolver } from "./connection.resolver";
import { ConnectionService } from "./services/connection.service";
import { ConnectionState } from "./state/connection.state";

@NgModule({
  declarations: [ConnectionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AdminsModule,
    DetailsModule,
    ConnectionRoutingModule,
    NgxsModule.forFeature([ConnectionState]),
    UpdateConnectionsModule
  ],
  providers: [ConnectionService, ConnectionResolver]
})
export class ConnectionModule {}
