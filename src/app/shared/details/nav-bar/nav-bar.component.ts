import { Component } from "@angular/core";
import { INavLink } from "../details.interfaces";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html"
})
export class NavBarComponent {
  public navLinks: INavLink[] = [
    {
      label: "Recommendation",
      path: "./"
    },
    {
      label: "Concerns",
      path: "/concerns"
    },
    {
      label: "Connections",
      path: "/connections"
    }
  ];
}
