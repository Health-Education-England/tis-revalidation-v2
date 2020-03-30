import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { UnderNoticeComponent } from "./under-notice/under-notice.component";
import { TraineeSummaryComponent } from "./trainee-summary/trainee-summary.component";
import { RevalidationHistoryComponent } from "./revalidation-history/revalidation-history.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    data: { title: "Dashboard" },
    children: [
      {
        path: "",
        redirectTo: "under-notice",
        pathMatch: "full"
      },
      {
        path: "under-notice",
        component: UnderNoticeComponent,
        data: { title: "Under notice" }
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
export class DashboardRoutingModule {}
