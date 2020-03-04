import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardPageComponent } from "../pages/dashboard-page/dashboard-page.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardPageComponent,
    data: { title: "Dashboard" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
