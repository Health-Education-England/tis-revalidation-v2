import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay, filter } from "rxjs/operators";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent
} from "@angular/router";

@Component({
  selector: "app-record-details",
  templateUrl: "./record-details.component.html",
  styleUrls: ["./record-details.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RecordDetailsComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  showToolbar$: Observable<boolean> = this.renderToolbar("showToolbar");
  showNotes$: Observable<boolean> = this.renderToolbar("showNotes");

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.showToolbar$.subscribe();
    this.showNotes$.subscribe();
  }

  private renderToolbar(flag: string): Observable<boolean> {
    return this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .pipe(
        map(() => {
          const childRoute = this.activatedRoute.snapshot.firstChild;
          return childRoute.data ? childRoute.data[flag] : false;
        }),
        shareReplay()
      );
  }
}
