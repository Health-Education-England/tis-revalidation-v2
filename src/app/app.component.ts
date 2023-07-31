import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { GoogleTagManagerService } from "angular-google-tag-manager";
import { zip, of } from "rxjs";
import { filter, mergeMap } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: Title,
    private router: Router,
    private gtmService: GoogleTagManagerService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        mergeMap((event: NavigationEnd) => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = "";
          while (route.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data["title"]) {
            routeTitle = route.snapshot.data["title"];
          }
          return zip(of(event), of(routeTitle));
        })
      )
      .subscribe(([event, title]) => {
        if (title) {
          this.titleService.setTitle(`Revalidation - ${title}`);
        }
        const gtmTag = {
          event: "page",
          pageName: event.url
        };

        this.gtmService.pushTag(gtmTag);
      });
  }
}
