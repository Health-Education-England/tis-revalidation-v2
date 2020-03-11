import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { menuItems } from "../menu-items.const";
import { IMenuItem } from "../menu-item.interface";
import { environment } from "@environment";

@Component({
  selector: "app-mobile-menu",
  templateUrl: "./mobile-menu.component.html",
  styleUrls: ["./mobile-menu.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class MobileMenuComponent implements OnInit {
  menuItems$: IMenuItem[] = menuItems;
  hostURI: string = environment.adminsUIHostUri;
  constructor() {}

  ngOnInit(): void {}
}
