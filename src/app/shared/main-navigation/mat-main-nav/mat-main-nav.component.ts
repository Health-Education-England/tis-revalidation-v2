import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatIconRegistry } from "@angular/material/icon";
import { Observable, Subscription } from "rxjs";
import { map, shareReplay, filter } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-mat-main-nav",
  templateUrl: "./mat-main-nav.component.html",
  styleUrls: ["./mat-main-nav.component.scss"]
})
export class MatMainNavComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
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
    this.subscription = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const hashLocation = `#${this.skipLinkSelector}`;
        this.activeUrl = `${this.router.url}`;
        this.activeUrl = this.activeUrl.endsWith(hashLocation)
          ? this.activeUrl
          : this.activeUrl + hashLocation;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
