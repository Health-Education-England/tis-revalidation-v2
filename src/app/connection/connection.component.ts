import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { environment } from "@environment";
import { IConnectionHistory, IDesignatedBody } from "./connection.interfaces";
import { ConnectionState } from "./state/connection.state";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../core/auth/auth.service";
import { ACTION_REASONS, ADMIN_ROLES } from "./constants";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";

@Component({
  selector: "app-connection",
  templateUrl: "./connection.component.html",
  styleUrls: ["./connection.component.scss"]
})
export class ConnectionComponent implements OnInit, OnDestroy {
  @Select(ConnectionState.connectionHistory)
  public connectionHistory$: Observable<IConnectionHistory[]>;

  @Select(ConnectionState.dbcs)
  public dbcs$: Observable<IDesignatedBody[]>;

  updateConnectionForm: FormGroup;
  actionControl: FormControl;
  reasonControl: FormControl;
  dbcControl: FormControl;

  dateFormat = environment.dateFormat;
  columnsToDisplay = [
    "programmeName",
    "designatedBodyCode",
    "programmeOwner",
    "connectionStatus",
    "programmeMembershipStartDate",
    "programmeMembershipEndDate"
  ];
  componentSubscriptions: Subscription[] = [];
  dbcs: IDesignatedBody[] = [];
  actions: string[] = [];
  reasons: string[] = [];

  enableUpdateConnection = false;
  addConnectionSelected = false;
  showReasonDropdown = false;
  showReasonText = false;

  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService,
    public dialog: MatDialog
  ) {
    this.actions = ACTION_REASONS.map((ar) => ar.action);
  }

  ngOnInit(): void {
    this.enableUpdateConnection = this.authService.roles.some((role) =>
      ADMIN_ROLES.includes(role)
    );
    this.bindFormControl();
    this.dbcs$.subscribe((res) => (this.dbcs = res));
  }

  ngOnDestroy(): void {
    this.componentSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  updateConnection() {
    if (this.updateConnectionForm.valid) {
      const formValue = this.updateConnectionForm.value;
      // Save api call
      this.snackBarService.openSnackBar(
        "Connection details updated successfully"
      );
      this.resetForm();
    }
  }

  getDBCAbbrevation(dbc: string) {
    return this.dbcs.find((d) => d.dbc === dbc).abbr || dbc;
  }

  openDialog() {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updateConnection();
          this.updateConnectionForm.reset();
        }
      });
  }

  private bindFormControl() {
    this.updateConnectionForm = new FormGroup({});

    this.actionControl = new FormControl(null, Validators.required);
    this.reasonControl = new FormControl(null, Validators.required);
    this.dbcControl = new FormControl(null, Validators.required);

    this.subscribeToActions();
  }

  private subscribeToActions() {
    this.componentSubscriptions.push(
      this.actionControl.valueChanges.subscribe((action) => {
        if (action) {
          this.addConnectionSelected = action === "Add connection";
          this.showReasonDropdown =
            this.addConnectionSelected || action === "Remove connection";
          this.showReasonText = !this.showReasonDropdown;

          if (this.addConnectionSelected) {
            this.dbcControl.setValidators(Validators.required);
            this.updateConnectionForm.addControl("dbc", this.dbcControl);
            this.dbcControl.updateValueAndValidity();
          } else {
            this.updateConnectionForm.removeControl("dbc");
            this.dbcControl.clearValidators();
          }

          this.reasonControl.setValue("");
          if (this.showReasonDropdown) {
            this.reasons =
              ACTION_REASONS.find((arm) => arm.action === action).reasons || [];
          }

          this.updateConnectionForm.addControl("reason", this.reasonControl);
          this.reasonControl.updateValueAndValidity();
        }
      })
    );

    this.updateConnectionForm.addControl("action", this.actionControl);
  }

  private resetForm() {
    this.updateConnectionForm.reset();
    this.showReasonDropdown = false;
    this.showReasonText = false;
    this.addConnectionSelected = false;
  }
}
