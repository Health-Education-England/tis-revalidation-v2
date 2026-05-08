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
import { ConnectionHistoryComponent } from "./connection-history/connection-history.component";
import { ConnectionHiddenDiscrepanciesComponent } from "./connection-hidden-discrepancies/connection-hidden-discrepancies.component";
import { FormatDesignatedBodyPipe } from "../shared/pipes/format-designated-body.pipe";

@NgModule({
  declarations: [
    ConnectionComponent,
    ConnectionHistoryComponent,
    ConnectionHiddenDiscrepanciesComponent
  ],
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
  providers: [ConnectionService, ConnectionResolver, FormatDesignatedBodyPipe]
})
export class ConnectionModule {}
