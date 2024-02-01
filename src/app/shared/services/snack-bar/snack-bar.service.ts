import { Injectable, NgZone } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { InfoDialogComponent } from "../../info-dialog/info-dialog.component";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private dialog: MatDialog, private zone: NgZone) {}

  public openSnackBar(message: string) {
    this.zone.run(() =>
      this.dialog.open(InfoDialogComponent, { data: { message } })
    );
  }
}
