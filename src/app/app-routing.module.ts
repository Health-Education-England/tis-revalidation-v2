import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/trainees",
    pathMatch: "full"
  },
  {
    path: "trainees",
    loadChildren: () =>
      import("./trainees/trainees.module").then((m) => m.TraineesModule)
  },
  {
    path: "trainees/:id",
    loadChildren: () =>
      import("./trainee/trainee.module").then((m) => m.TraineeModule)
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
