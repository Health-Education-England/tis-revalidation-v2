import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Store, Select } from "@ngxs/store";
import { ToggleDrawer } from "../notes-drawer/state/notes-drawer.actions";
import { DetailsSideNavState } from "../details-side-nav/state/details-side-nav.state";
import { IDetailsSideNav } from "../details-side-nav/details-side-nav.interfaces";
import { NotesDrawerState } from "../notes-drawer/state/notes-drawer.state";

@Component({
  selector: "app-tool-bar",
  templateUrl: "./tool-bar.component.html"
})
export class ToolBarComponent implements OnInit {
  @Select(NotesDrawerState.drawerStatus) isOpen$: Observable<boolean>;
  @Select(DetailsSideNavState.traineeDetails)
  traineeDetails$: Observable<IDetailsSideNav>;
  matBadge: number;
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
  ngOnInit(): void {
    this.traineeDetails$.subscribe((traineeDetails) => {
      if (traineeDetails.notes.length > 0) {
        this.matBadge = traineeDetails.notes.length;
      } else {
        this.matBadge = null;
      }
    });
  }
}
