import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecordDetailsComponent } from "../shared/details/record-details/record-details.component";
import { ConcernComponent } from "./concern.component";

const routes: Routes = [
  {
    path: "",
    component: RecordDetailsComponent,
    data: { title: "Concern summary" },
    children: [
      {
        path: "",
        component: ConcernComponent,
        data: { title: "Concern history" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcernRoutingModule {}
