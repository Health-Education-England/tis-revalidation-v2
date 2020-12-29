import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConnectionsResolver } from "./connections.resolver";
import { ConnectionsComponent } from "./connections.component";

const routes: Routes = [
  {
    path: "",
    component: ConnectionsComponent,
    data: { title: "Connections list" },
    resolve: { connections: ConnectionsResolver },
    runGuardsAndResolvers: "always"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionsRoutingModule {}
