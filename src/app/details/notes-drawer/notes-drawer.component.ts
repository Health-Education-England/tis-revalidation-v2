import { Component, OnInit } from "@angular/core";
import { INote } from "./notes-drawer.interfaces";
import { Select } from "@ngxs/store";
import { NotesDrawerState } from "../notes-drawer/state/notes-drawer.state";
import { DetailsSideNavState } from "../details-side-nav/state/details-side-nav.state";
import { Observable } from "rxjs";
import { IDetailsSideNav } from "../details-side-nav/details-side-nav.interfaces";
import { AuthService } from "src/app/core/auth/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NotesDrawerService } from "./service/notes-drawer.service";
@Component({
  selector: "app-notes-drawer",
  templateUrl: "./notes-drawer.component.html",
  styleUrls: ["./notes-drawer.component.scss"]
})
export class NotesDrawerComponent implements OnInit {
  showAddNote: boolean;
  isAdmin: boolean;
  note: INote;
  newNoteForm: FormGroup;

  @Select(NotesDrawerState.drawerStatus) isOpen$: Observable<boolean>;

  @Select(DetailsSideNavState.traineeDetails)
  traineeDetails$: Observable<IDetailsSideNav>;

  constructor(
    private authService: AuthService,
    private notesDrawerService: NotesDrawerService
  ) {}
  onSubmit(): void {
    if (this.newNoteForm.valid) {
    }
  }
  onCancel(): void {
    this.showAddNote = !this.showAddNote;
    this.newNoteForm.reset();
  }

  ngOnInit(): void {
    this.showAddNote = false;
    this.isAdmin = this.authService.isSuperAdmin;
    this.newNoteForm = new FormGroup({
      noteText: new FormControl("", [Validators.required])
    });
  }
  get noteText() {
    return this.newNoteForm.get("noteText");
  }
}
