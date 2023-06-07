import { Component, OnInit } from "@angular/core";
import { menuItems } from "../menu-items.const";
import { IMenuItem } from "../menu-item.interface";
import { environment } from "@environment";
import { AuthService } from "src/app/core/auth/auth.service";
import { UtilitiesService } from "src/app/shared/services/utilities/utilities.service";

@Component({
  selector: "app-desktop-menu",
  templateUrl: "./desktop-menu.component.html",
  styleUrls: ["./desktop-menu.component.scss"]
})
export class DesktopMenuComponent {
  menuItems$: IMenuItem[] = menuItems;
  hostURI: string = environment.adminsUIHostUri;
  activeItem = "Revalidation";
  env: string = environment.name;

  constructor(private utils: UtilitiesService) {}

  setActiveItem(selectedItem: string) {
    this.activeItem = selectedItem;
  }
  showLink(item: IMenuItem): boolean {
    return this.utils.showNavigationLink(item);
  }
}
