import { Injectable, NgZone } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  public horizontalPosition: MatSnackBarHorizontalPosition = "center";
  public verticalPosition: MatSnackBarVerticalPosition = "top";
  public snackBarDuration = 10000;

  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  public openSnackBar(message: string) {
    this.zone.run(() =>
      this.snackBar.open(message, "Close", {
        duration: this.snackBarDuration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      })
    );
  }
}
