import { Component } from "@angular/core";
import { DEFAULT_ROUTE } from "../../core/trainee/constants";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html"
})
export class PageNotFoundComponent {
  public defaultRoute: string = DEFAULT_ROUTE;
}
