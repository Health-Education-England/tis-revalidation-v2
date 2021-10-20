import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: []
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  cancelLabel?: string;
  confirmLabel?: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    this.title = data.title;
    this.message = data.message;
    this.cancelLabel = data.cancelLabel || "No";
    this.confirmLabel = data.confirmLabel || "Yes";
  }
}

export class ConfirmDialogModel {
  constructor(
    public title: string,
    public message: string,
    public cancelLabel?: string,
    public confirmLabel?: string
  ) {}
}
