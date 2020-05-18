import { Component, Input, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatIconRegistry } from "@angular/material/icon";
import { Observable } from "rxjs";
import { map, shareReplay, filter } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-mat-main-nav",
  templateUrl: "./mat-main-nav.component.html",
  styleUrls: ["./mat-main-nav.component.scss"]
})
export class MatMainNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  @Input() skipLinkSelector = "maincontent";
  activeUrl: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    this.addNHSIcon();
  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const hashLocation = `#${this.skipLinkSelector}`;
        this.activeUrl = `${this.router.url}`;
        this.activeUrl = this.activeUrl.endsWith(hashLocation)
          ? this.activeUrl
          : this.activeUrl + hashLocation;
      });
  }

  addNHSIcon() {
    this.matIconRegistry.addSvgIcon(
      `icon_nhs_logo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `assets/logos/logo-nhs.svg`
      )
    );
  }
}
