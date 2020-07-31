import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, ViewEncapsulation } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay, filter } from "rxjs/operators";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent
} from "@angular/router";
import { CommentsService } from "../comments-tool-bar/comments.service";

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
  showToolbar$ = this.commentsService.showToolBar$;
  showNotes$ = this.commentsService.showNotes$;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private commentsService: CommentsService
  ) {}
}
