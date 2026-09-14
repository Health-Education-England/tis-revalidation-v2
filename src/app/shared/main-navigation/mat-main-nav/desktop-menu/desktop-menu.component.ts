import { Component } from "@angular/core";
import { menuItems } from "../menu-items.const";
import { IMenuItem, MenuType } from "../menu-item.interface";
import { environment } from "@environment";
import { UtilitiesService } from "src/app/shared/services/utilities/utilities.service";

@Component({
  selector: "app-desktop-menu",
  templateUrl: "./desktop-menu.component.html",
  styleUrls: ["./desktop-menu.component.scss"]
})
export class DesktopMenuComponent {
  menuItems: IMenuItem[];
  hostURI: string = environment.adminsUIHostUri;
  activeItem = "Revalidation";
  env: string = environment.name;
  menuType = MenuType;

  constructor(private readonly utils: UtilitiesService) {
    this.menuItems = this.utils.filterMenuItems(menuItems);
  }

  setActiveItem(selectedItem: string) {
    this.activeItem = selectedItem;
  }
}
