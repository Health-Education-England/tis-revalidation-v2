import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecordsComponent } from "../records/records.component";
import { ConnectionsResolver } from "./connections.resolver";

const routes: Routes = [
  {
    path: "",
    component: RecordsComponent,
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
