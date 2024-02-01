import { Component, Input, OnInit, ViewChild, ElementRef } from "@angular/core";
import { INote } from "../notes-drawer.interfaces";
import { environment } from "@environment";
import { MatDialog } from "@angular/material/dialog";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel
} from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { DetailsSideNavService } from "../../details-side-nav/service/details-side-nav.service";
import { Store } from "@ngxs/store";
import { EditNote } from "../../details-side-nav/state/details-side-nav.actions";

@Component({
  selector: "app-note-card",
  templateUrl: "./note-card.component.html",
  styleUrls: ["./note-card.component.scss"]
})
export class NoteCardComponent {
  @Input() note: INote;
  @Input() index: number;
  @Input() isAdmin: boolean;
  @ViewChild("noteTextarea") noteTextarea: ElementRef;
  dateFormat: string = environment.dateFormat;

  constructor(
    public dialog: MatDialog,
    private detailsSideNavService: DetailsSideNavService,
    private store: Store
  ) {}

  onDeleteNote() {
    const dialogData = new ConfirmDialogModel(
      "Delete note",
      "Are you sure you want to delete this note?",
      "Cancel",
      "Delete"
    );
    this.dialog
      .open(ConfirmDialogComponent, { data: dialogData })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
        }
      });
  }

  onSaveEditNote(): void {
    if (this.note.text !== this.noteTextarea.nativeElement.value) {
      this.note.text = this.noteTextarea.nativeElement.value;
      const editNote: INote = {
        id: this.note.id,
        gmcId: this.note.gmcId,
        text: this.note.text
      };
      this.detailsSideNavService
        .editNote(editNote)
        .subscribe((response: INote) => {
          this.store.dispatch(new EditNote(response));
        });
    }
    this.note.edit = !this.note.edit;
  }
}
