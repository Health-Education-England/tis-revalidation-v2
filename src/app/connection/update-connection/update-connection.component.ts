import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "src/app/core/auth/auth.service";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { IAction, IDesignatedBody, IReason } from "../connection.interfaces";
import { ACTIONS, ActionType } from "../constants";
import { ConnectionState } from "../state/connection.state";

@Component({
  selector: "app-update-connection",
  templateUrl: "./update-connection.component.html",
  styleUrls: ["./update-connection.component.scss"]
})
export class UpdateConnectionComponent implements OnInit {
  @Output() submittFormEvent = new EventEmitter<any>();

  @Select(ConnectionState.dbcs)
  public dbcs$: Observable<IDesignatedBody[]>;

  componentSubscriptions: Subscription[] = [];
  updateConnectionForm: FormGroup;
  actionControl: FormControl;
  reasonControl: FormControl;
  dbcControl: FormControl;

  dbcs: IDesignatedBody[] = [];
  userDbcs: IDesignatedBody[] = [];
  actions: IAction[] = [];
  reasons: IReason[] = [];

  addConnectionSelected = false;
  showReasonDropdown = false;
  showReasonText = false;

  constructor(private authService: AuthService, public dialog: MatDialog) {
    this.actions = ACTIONS;
  }

  ngOnInit(): void {
    this.bindFormControl();
    this.dbcs$.subscribe((res) => {
      if (res) {
        this.dbcs = res;
        this.userDbcs = res.filter((r) =>
          this.authService.userDesignatedBodies.includes(r.dbc)
        );
      }
    });
  }

  onSubmitt() {
    if (this.updateConnectionForm.valid) {
      this.dialog
        .open(ConfirmDialogComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.submittFormEvent.emit(this.updateConnectionForm.value);
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
          this.addConnectionSelected = action === ActionType.ADD_CONNECTION;
          this.showReasonDropdown =
            this.addConnectionSelected ||
            action === ActionType.REMOVE_CONNECTION;
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
              ACTIONS.find((arm) => arm.action === action).reasons || [];
          }

          this.updateConnectionForm.addControl("reason", this.reasonControl);
          this.reasonControl.updateValueAndValidity();
        }
      })
    );

    this.updateConnectionForm.addControl("action", this.actionControl);
  }
}
