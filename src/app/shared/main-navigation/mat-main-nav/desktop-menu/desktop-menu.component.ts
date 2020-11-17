import { Component, OnInit } from "@angular/core";
import { menuItems } from "../menu-items.const";
import { IMenuItem } from "../menu-item.interface";
import { environment } from "@environment";

@Component({
  selector: "app-desktop-menu",
  templateUrl: "./desktop-menu.component.html",
  styleUrls: ["./desktop-menu.component.scss"]
})
export class DesktopMenuComponent implements OnInit {
  menuItems$: IMenuItem[] = menuItems;
  hostURI: string = environment.adminsUIHostUri;
  activeItem = "Revalidation";

  constructor() {}

  ngOnInit(): void {}

  setActiveItem(selectedItem: string) {
    this.activeItem = selectedItem;
  }
}
