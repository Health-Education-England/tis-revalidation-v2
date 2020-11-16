import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecordDetailsComponent } from "../details/record-details/record-details.component";
import { ConnectionComponent } from "./connection.component";
import { ConnectionResolver } from "./connection.resolver";

const routes: Routes = [
  {
    path: "",
    component: RecordDetailsComponent,
    data: { title: "Connection summary" },
    resolve: { connection: ConnectionResolver },
    runGuardsAndResolvers: "always",
    children: [
      {
        path: "",
        component: ConnectionComponent,
        data: { title: "Connection history" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionRoutingModule {}
