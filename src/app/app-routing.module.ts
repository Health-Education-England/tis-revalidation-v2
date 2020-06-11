import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/recommendations",
    pathMatch: "full"
  },
  {
    path: "recommendations",
    loadChildren: () =>
      import("./recommendations/recommendations.module").then(
        (m) => m.RecommendationsModule
      )
  },
  {
    path: "trainee/:id",
    loadChildren: () =>
      import("./trainee/trainee.module").then((m) => m.TraineeModule)
  },
  {
    path: "concerns",
    loadChildren: () =>
      import("./concerns/concerns.module").then((m) => m.ConcernsModule)
  },
  {
    path: "connections",
    loadChildren: () =>
      import("./connections/connections.module").then(
        (m) => m.ConnectionsModule
      )
  },
  {
    path: "404",
    component: PageNotFoundComponent
  },
  {
    path: "**",
    redirectTo: "404"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
