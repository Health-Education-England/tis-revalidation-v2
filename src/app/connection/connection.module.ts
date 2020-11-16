import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/material/material.module";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";

import { DetailsModule } from "../details/details.module";
import { AdminsModule } from "../admins/admins.module";
import { SharedModule } from "../shared/shared.module";
import { ConnectionComponent } from "./connection.component";
import { ConnectionRoutingModule } from "./connection-routing.module";
import { ConnectionResolver } from "./connection.resolver";
import { ConnectionService } from "./services/connection.service";
import { ConnectionState } from "./state/connection.state";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";

@NgModule({
  declarations: [ConnectionComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AdminsModule,
    DetailsModule,
    ConnectionRoutingModule,
    NgxsModule.forFeature([ConnectionState])
  ],
  providers: [ConnectionService, ConnectionResolver]
})
export class ConnectionModule {}
