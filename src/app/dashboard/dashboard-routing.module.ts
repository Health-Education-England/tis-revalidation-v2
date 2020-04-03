import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TraineeSummaryComponent } from "./trainee-summary/trainee-summary.component";
import { RevalidationHistoryComponent } from "./revalidation-history/revalidation-history.component";

const routes: Routes = [
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
