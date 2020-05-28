import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConnectionListComponent } from "./connection-list/connection-list.component";

import { ConnectionsRoutingModule } from "./connections-routing.module";
import { ConnectionsComponent } from "./connections.component";

@NgModule({
  declarations: [ConnectionListComponent, ConnectionsComponent],
  imports: [CommonModule, ConnectionsRoutingModule]
})
export class ConnectionsModule {}
