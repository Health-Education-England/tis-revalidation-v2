import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { menuItems } from "../menu-items.const";
import { IMenuItem } from "../menu-item.interface";
import { environment } from "@environment";
import { MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: "app-desktop-menu",
  templateUrl: "./desktop-menu.component.html",
  styleUrls: ["./desktop-menu.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class DesktopMenuComponent implements OnInit {
  menuItems$: IMenuItem[] = menuItems;
  hostURI: string = environment.adminsUIHostUri;
  private currentMenuTrigger: MatMenuTrigger;
  private currentMenuElement: Element;

  constructor() {}

  ngOnInit(): void {}
  /**
   * TO:DO investigate mouseover functionality
   * add (mouseover)="menuOver(menuTrigger)" (mouseout)="menuOut(menuTrigger)"
   * add [hasBackdrop]="false" to sub menu
   * @param e
   */
  menuOver(e: MatMenuTrigger): void {
    if (this.currentMenuTrigger !== e) {
      if (!this.currentMenuTrigger) {
        this.currentMenuTrigger = e;
      } else {
        this.currentMenuTrigger.closeMenu();
        this.currentMenuTrigger = e;
      }
      e.openMenu();
    } else {
      if (e.menuClosed) {
        e.openMenu();
      }
    }
    this.currentMenuElement = document.querySelector(`#${e.menu.panelId}`);
  }
  menuOut(e: MatMenuTrigger): void {}
}
