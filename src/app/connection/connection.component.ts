import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";

import { environment } from "@environment";
import { IConnectionHistory, IDesignatedBody } from "./connection.interfaces";
import { ConnectionState } from "./state/connection.state";
import { AuthService } from "../core/auth/auth.service";
import { ACTION_REASONS, ADMIN_ROLES, ConnectionActions } from "./constants";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import { ConnectionService } from "./services/connection.service";
import { Get } from "./state/connection.actions";

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

  @Select(ConnectionState.gmcNumber)
  public gmcNumber$: Observable<number>;

  @Select(ConnectionState.doctorCurrentDbc)
  public userDbc$: Observable<string>;

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
  userDbcs: IDesignatedBody[] = [];
  actions: string[] = [];
  reasons: string[] = [];
  gmcNumber: number;
  doctorCurrentDbc: string;

  enableUpdateConnection = false;
  addConnectionSelected = false;
  showReasonDropdown = false;
  showReasonText = false;
  submitting = false;

  constructor(
    private store: Store,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
    private connectionService: ConnectionService
  ) {
    this.actions = ACTION_REASONS.map((ar) => ar.action);
  }

  ngOnInit(): void {
    this.enableUpdateConnection = this.authService.roles.some((role) =>
      ADMIN_ROLES.includes(role)
    );
    this.bindFormControl();
    this.dbcs$.subscribe((res) => {
      this.dbcs = res;
      this.userDbcs = res.filter((r) =>
        this.authService.userDesignatedBodies.includes(r.dbc)
      );
    });
    this.gmcNumber$.subscribe((res) => (this.gmcNumber = res));
    this.userDbc$.subscribe((res) => (this.doctorCurrentDbc = res));
  }

  ngOnDestroy(): void {
    this.componentSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  getDBCAbbrevation(dbc: string) {
    return this.dbcs.find((d) => d.dbc === dbc)?.abbr || dbc;
  }

  openDialog() {
    if (this.updateConnectionForm.valid) {
      this.dialog
        .open(ConfirmDialogComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.submitting = true;
            this.updateConnection();
          }
        });
    }
  }

  resetForm() {
    this.updateConnectionForm.reset();
    this.showReasonDropdown = false;
    this.showReasonText = false;
    this.addConnectionSelected = false;
  }

  private updateConnection() {
    let subscription: Observable<any>;
    const formValue = this.updateConnectionForm.value;

    switch (formValue.action) {
      case ConnectionActions.ADD_CONNECTION:
        subscription = this.connectionService.addConnection({
          changeReason: formValue.reason,
          designatedBodyCode: formValue.dbc,
          gmcId: this.gmcNumber
        });
        break;

      case ConnectionActions.REMOVE_CONNECTION:
        subscription = this.connectionService.removeConnection({
          changeReason: formValue.reason,
          designatedBodyCode: this.doctorCurrentDbc,
          gmcId: this.gmcNumber
        });
        break;

      case ConnectionActions.REVIEW_CONNECTION:
        break;

      case ConnectionActions.IGNORE_CONNECTION:
        break;

      default:
        this.snackBarService.openSnackBar("Please select an action");
        return;
    }

    if (subscription) {
      this.componentSubscriptions.push(
        subscription.subscribe(
          () => {
            this.snackBarService.openSnackBar(
              "Connection details updated successfully"
            );

            this.store.dispatch(new Get(this.gmcNumber));
            this.resetForm();
          },
          (error) => {
            this.snackBarService.openSnackBar("Error: " + error);
          },
          () => (this.submitting = false)
        )
      );
    }
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
          this.addConnectionSelected =
            action === ConnectionActions.ADD_CONNECTION;
          this.showReasonDropdown =
            this.addConnectionSelected ||
            action === ConnectionActions.REMOVE_CONNECTION;
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
}
