import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Store, Select } from "@ngxs/store";
import { ToggleDrawer } from "../notes-drawer/state/notes-drawer.actions";

import { NotesDrawerState } from "../notes-drawer/state/notes-drawer.state";

@Component({
  selector: "app-tool-bar",
  templateUrl: "./tool-bar.component.html"
})
export class ToolBarComponent implements OnInit {
  @Select(NotesDrawerState.drawerStatus) isOpen$: Observable<boolean>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  toggleNotesDrawer() {
    this.store.dispatch(new ToggleDrawer());
  }
  ngOnInit(): void {}
}
