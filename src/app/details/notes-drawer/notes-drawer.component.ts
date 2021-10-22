import { Component, OnInit } from "@angular/core";
import { INote } from "./notes-drawer.interfaces";
import { Select, Store } from "@ngxs/store";
import { NotesDrawerState } from "../notes-drawer/state/notes-drawer.state";
import { DetailsSideNavState } from "../details-side-nav/state/details-side-nav.state";
import { Observable } from "rxjs";
import { IDetailsSideNav } from "../details-side-nav/details-side-nav.interfaces";
import { AuthService } from "src/app/core/auth/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DetailsSideNavService } from "../details-side-nav/service/details-side-nav.service";
import { AddNote } from "../details-side-nav/state/details-side-nav.actions";
import { ActivatedRoute } from "@angular/router";

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
  gmcNumber: number;

  @Select(NotesDrawerState.drawerStatus) isOpen$: Observable<boolean>;

  @Select(DetailsSideNavState.traineeDetails)
  traineeDetails$: Observable<IDetailsSideNav>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private detailsSideNavService: DetailsSideNavService,
    private store: Store
  ) {}
  onSubmit(): void {
    if (this.newNoteForm.valid) {
      const newNote: INote = {
        gmcId: this.gmcNumber,
        text: this.newNoteForm.value.noteText
      };
      this.detailsSideNavService
        .addNote(newNote)
        .subscribe((response: INote) => {
          this.store.dispatch(new AddNote(response));
          this.newNoteForm.reset();
        });
      this.showAddNote = !this.showAddNote;
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
    this.gmcNumber = Number(this.activatedRoute.snapshot.params.gmcNumber);
  }

  get noteText() {
    return this.newNoteForm.get("noteText");
  }
}
