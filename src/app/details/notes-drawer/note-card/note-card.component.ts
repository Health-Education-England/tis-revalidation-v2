import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { INote } from "../../details.interfaces";
import { environment } from "@environment";
import { MatDialog } from "@angular/material/dialog";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel
} from "src/app/shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-note-card",
  templateUrl: "./note-card.component.html",
  styleUrls: ["./note-card.component.scss"]
})
export class NoteCardComponent implements OnInit {
  @Input() note: INote;
  @Input() index: number;

  @Output() noteUpdated = new EventEmitter<{ index: number; text: string }>();
  @Output() noteDeleted = new EventEmitter<number>();
  dateFormat: string = environment.dateFormat;
  constructor(public dialog: MatDialog) {}

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
          this.noteDeleted.emit(this.index);
        }
      });
  }
  onUpdateNote() {
    this.noteUpdated.emit({ index: this.index, text: this.note.text });
    this.note.edit = false;
  }
  ngOnInit(): void {}
}
