import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConnectionsComponent } from "./connections.component";

const routes: Routes = [
  {
    path: "",
    component: ConnectionsComponent,
    data: { title: "Connections list" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionsRoutingModule {}
