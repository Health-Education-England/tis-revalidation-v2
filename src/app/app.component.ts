import { Component, OnInit, HostBinding } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { GoogleTagManagerService } from "angular-google-tag-manager";
import { zip, of, Observable } from "rxjs";
import { filter, map, mergeMap } from "rxjs/operators";
import { environment } from "@environment";
import { ContentfulService } from "./shared/services/contentful/contentful.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  @HostBinding("attr.app-version") appVersionAttr = environment.appVersion;
  constructor(
    private titleService: Title,
    private router: Router,
    private gtmService: GoogleTagManagerService,
    private contentfulService: ContentfulService
  ) {}

  messages$: Observable<any | undefined>;
  ngOnInit() {
    this.messages$ = this.contentfulService.getAlerts();

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
