import { Component, Inject, OnInit } from "@angular/core";
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";

@Component({
  selector: "app-info-dialog",
  templateUrl: "./info-dialog.component.html"
})
export class InfoDialogComponent {
  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {
    this.message = data.message;
  }
}
