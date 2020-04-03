import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DEFAULT_ROUTE } from "./core/trainee/constants";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: DEFAULT_ROUTE,
    pathMatch: "full"
  },
  {
    path: "",
    loadChildren: () =>
      import("./trainees/trainees.module").then((m) => m.TraineesModule)
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule)
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
