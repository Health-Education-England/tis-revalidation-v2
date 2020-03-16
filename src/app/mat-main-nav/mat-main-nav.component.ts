import { Component, ViewEncapsulation, Input } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatIconRegistry } from "@angular/material/icon";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-mat-main-nav",
  templateUrl: "./mat-main-nav.component.html",
  styleUrls: ["./mat-main-nav.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class MatMainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  @Input() skipLinkSelector = "maincontent";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.addNHSIcon();
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
