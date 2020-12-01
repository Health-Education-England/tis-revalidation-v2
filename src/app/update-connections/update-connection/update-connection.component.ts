import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/core/auth/auth.service";
import { CONNECTION_ACTIONS } from "../constants";
import { IDesignatedBody } from "src/app/reference/reference.interfaces";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel
} from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { ReferenceService } from "src/app/reference/services/reference.service";
import { ActionType, IAction, IReason } from "../update-connections.interfaces";
import { ConnectionService } from "src/app/connection/services/connection.service";
import { UpdateConnectionsService } from "../services/update-connections.service";

@Component({
  selector: "app-update-connection",
  templateUrl: "./update-connection.component.html",
  styleUrls: ["./update-connection.component.scss"]
})
export class UpdateConnectionComponent implements OnInit {
  @Output() submittFormEvent = new EventEmitter<any>();

  componentSubscriptions: Subscription[] = [];
  updateConnectionForm: FormGroup;
  actionControl: FormControl;
  reasonControl: FormControl;
  dbcControl: FormControl;

  dbcs: IDesignatedBody[] = [];
  userDbcs: IDesignatedBody[] = [];
  actions: IAction[] = [];
  reasons: IReason[] = [];
  canSave = true;
  canCancel = false;

  addConnectionSelected = false;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private referenceService: ReferenceService,
    public updateConnectionsService: UpdateConnectionsService
  ) {
    this.actions = CONNECTION_ACTIONS;
  }

  ngOnInit(): void {
    this.bindFormControl();
    this.referenceService.getDbcs().subscribe((res) => {
      if (res) {
        this.dbcs = res;
        this.userDbcs = res.filter((r) =>
          this.authService.userDesignatedBodies.includes(r.dbc)
        );
      }
    });
    this.updateConnectionsService.canSave$.subscribe(
      (result) => (this.canSave = result)
    );

    this.updateConnectionsService.canCancel$.subscribe(
      (result) => (this.canCancel = result)
    );
  }

  onSubmitt() {
    if (this.updateConnectionForm.valid) {
      const dialogData = new ConfirmDialogModel(
        "Update connection(s)",
        "Are you sure you want to save changes to all selected records?"
      );
      this.dialog
        .open(ConfirmDialogComponent, { data: dialogData })
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
    this.addConnectionSelected = false;
    this.reasons = [];
  }

  cancel() {
    this.updateConnectionsService.enableUpdateConnections(false);
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

          if (this.addConnectionSelected) {
            this.dbcControl.setValidators(Validators.required);
            this.updateConnectionForm.addControl("dbc", this.dbcControl);
            this.dbcControl.updateValueAndValidity();
          } else {
            this.updateConnectionForm.removeControl("dbc");
            this.dbcControl.clearValidators();
          }

          this.reasonControl.setValue("");
          this.reasons =
            CONNECTION_ACTIONS.find((arm) => arm.action === action)?.reasons ||
            [];
          this.reasonControl.updateValueAndValidity();
        }
      })
    );

    this.updateConnectionForm.addControl("action", this.actionControl);
    this.updateConnectionForm.addControl("reason", this.reasonControl);
  }
}
