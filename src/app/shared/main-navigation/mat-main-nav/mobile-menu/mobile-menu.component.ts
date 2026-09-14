import { Component, Output, EventEmitter } from "@angular/core";
import { menuItems } from "../menu-items.const";
import { IMenuItem, MenuType } from "../menu-item.interface";
import { environment } from "@environment";
import { UtilitiesService } from "src/app/shared/services/utilities/utilities.service";

@Component({
  selector: "app-mobile-menu",
  templateUrl: "./mobile-menu.component.html",
  styleUrls: ["./mobile-menu.component.scss"]
})
export class MobileMenuComponent {
  menuItems: IMenuItem[];
  hostURI: string = environment.adminsUIHostUri;
  env: string = environment.name;
  menuType = MenuType;

  @Output() closeMenu = new EventEmitter();
  constructor(private readonly utils: UtilitiesService) {
    this.menuItems = this.utils.filterMenuItems(menuItems);
  }

  onMenuClick(): void {
    this.closeMenu.emit();
  }
}
