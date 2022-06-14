import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { menuItems } from "../menu-items.const";
import { IMenuItem } from "../menu-item.interface";
import { environment } from "@environment";

@Component({
  selector: "app-mobile-menu",
  templateUrl: "./mobile-menu.component.html",
  styleUrls: ["./mobile-menu.component.scss"]
})
export class MobileMenuComponent {
  menuItems$: IMenuItem[] = menuItems;
  hostURI: string = environment.adminsUIHostUri;
  env: string = environment.name;

  @Output() closeMenu = new EventEmitter();
  constructor() {}

  onMenuClick(): void {
    this.closeMenu.emit();
  }
}
