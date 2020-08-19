import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { NotesService } from "../notes-tool-bar/notes.service";

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
  showNotes$ = this.notesService.showNotes$;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private notesService: NotesService
  ) {}
}
