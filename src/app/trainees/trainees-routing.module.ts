import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TraineesComponent } from "./trainees.component";
import { TraineesListComponent } from "./trainees-list/trainees-list.component";
import { TraineesResolver } from "./resolvers/trainees.resolver";
import { TraineesUnderNoticeResolver } from "./resolvers/trainees-under-notice.resolver";
import { TraineeSummaryComponent } from "./trainee-summary/trainee-summary.component";
import { RevalidationHistoryComponent } from "./revalidation-history/revalidation-history.component";

const routes: Routes = [
  {
    path: "",
    component: TraineesComponent,
    data: { title: "Trainees" },
    children: [
      {
        path: "",
        component: TraineesListComponent,
        data: { title: "Trainees list" },
        resolve: { store: TraineesResolver }
      },
      {
        path: "under-notice",
        component: TraineesListComponent,
        data: { title: "Trainees under-notice list" },
        resolve: { store: TraineesUnderNoticeResolver }
      }
    ]
  },
  {
    path: "trainee/:id",
    component: TraineeSummaryComponent,
    data: { title: "Trainee summary" },
    children: [
      {
        path: "",
        component: RevalidationHistoryComponent,
        data: { title: "Revalidation history" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineesRoutingModule {}
