import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { NotesService } from "../notes-tool-bar/notes.service";
import { Select } from "@ngxs/store";
import { NotesDrawerState } from "../notes-drawer/state/notes-drawer.state";

@Component({
  selector: "app-record-details",
  templateUrl: "./record-details.component.html",
  styleUrls: ["./record-details.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RecordDetailsComponent implements OnInit {
  @Select(NotesDrawerState.drawerStatus) isOpen$: Observable<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  showNotes$ = this.notesService.showNotes$;
  ngOnInit() {}
  constructor(
    private breakpointObserver: BreakpointObserver,
    private notesService: NotesService
  ) {}
}
