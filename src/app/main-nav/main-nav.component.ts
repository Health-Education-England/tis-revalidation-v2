import { Component, OnInit, Input } from "@angular/core";
import { menuItems } from "../mat-main-nav/menu-items.const";
import { IMenuItem } from "../mat-main-nav/menu-item.interface";
import { environment } from "@environment";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html"
})
export class MainNavComponent implements OnInit {
  @Input() skipLinkSelector: string = "maincontent";
  showMenu: boolean = false;
  menuItems$: IMenuItem[] = menuItems;
  hostURI: string = environment.adminsUIHostUri;
  constructor() {}

  ngOnInit(): void {}
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}
