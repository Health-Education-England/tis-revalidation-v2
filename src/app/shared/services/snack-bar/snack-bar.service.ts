import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, "Close", {
      duration: 5000
    });
  }
}
