import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"]
})
export class MainNavComponent implements OnInit {
  @Input() skipLinkSelector: string = "maincontent";
  showMenu: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}
