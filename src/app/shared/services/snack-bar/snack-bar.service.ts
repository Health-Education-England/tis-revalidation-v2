import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  public openSnackBar(message: string) {
    this.zone.run(() =>
      this.snackBar.open(message, "Close", {
        duration: 5000
      })
    );
  }
}
