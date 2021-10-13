import { Component, OnInit } from "@angular/core";
import { INote } from "../details.interfaces";
import { Select } from "@ngxs/store";
import { NotesDrawerState } from "../notes-drawer/state/notes-drawer.state";
import { DetailsSideNavState } from "../details-side-nav/state/details-side-nav.state";
import { Observable } from "rxjs";
import { IDetailsSideNav } from "../details-side-nav/details-side-nav.interfaces";
import { AuthService } from "src/app/core/auth/auth.service";

@Component({
  selector: "app-notes-drawer",
  templateUrl: "./notes-drawer.component.html",
  styleUrls: ["./notes-drawer.component.scss"]
})
export class NotesDrawerComponent implements OnInit {
  notes: INote[];
  note: INote;
  showAddNote: boolean;
  isAdmin: boolean;
  noteText: string;

  @Select(NotesDrawerState.drawerStatus) isOpen$: Observable<boolean>;

  @Select(NotesDrawerState.getNotes) notes$: Observable<INote[]>;

  @Select(DetailsSideNavState.traineeDetails)
  traineeDetails$: Observable<IDetailsSideNav>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.showAddNote = false;
    this.isAdmin = this.authService.isSuperAdmin;
  }
}
