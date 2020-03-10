import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { UnderNoticeComponent } from "./under-notice/under-notice.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
