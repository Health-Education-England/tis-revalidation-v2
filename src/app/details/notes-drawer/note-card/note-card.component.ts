import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { INote } from "../notes-drawer.interfaces";
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
  @Input() isAdmin: boolean;
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
        }
      });
  }

  ngOnInit(): void {}
}
