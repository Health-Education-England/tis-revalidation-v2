import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecordDetailsComponent } from "../details/record-details/record-details.component";
import { ConcernComponent } from "./concern.component";
import { ConcernResolver } from "./concern.resolver";
import { CreateConcernComponent } from "./create-concern/create-concern.component";

const routes: Routes = [
  {
    path: "",
    component: RecordDetailsComponent,
    data: { title: "Concern summary" },
    resolve: { concern: ConcernResolver },
    children: [
      {
        path: "",
        component: ConcernComponent,
        data: { title: "Concern history" }
      },
      {
        path: "create",
        component: CreateConcernComponent,
        data: {
          title: "Create concern"
        }
      },
      {
        path: "edit/:concernId",
        component: CreateConcernComponent,
        data: {
          title: "Edit concern"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcernRoutingModule {}
