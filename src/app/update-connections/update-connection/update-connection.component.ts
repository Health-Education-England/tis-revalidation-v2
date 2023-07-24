import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "src/app/core/auth/auth.service";
import { IDesignatedBody } from "src/app/reference/reference.interfaces";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel
} from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { ActionType, IAction, IReason } from "../update-connections.interfaces";
import { UpdateConnectionsService } from "../services/update-connections.service";
import { Select, Store } from "@ngxs/store";
import { Router } from "@angular/router";
import { ReferenceState } from "src/app/reference/state/reference.state";

@Component({
  selector: "app-update-connection",
  templateUrl: "./update-connection.component.html",
  styleUrls: ["./update-connection.component.scss"]
})
export class UpdateConnectionComponent implements OnInit {
  @Input() public currentDoctorDbcCode: string;
  @Output() submittFormEvent = new EventEmitter<any>();

  @Select(ReferenceState.Dbcs)
  public dbcs$: Observable<IDesignatedBody[]>;

  componentSubscriptions: Subscription[] = [];
  updateConnectionForm: UntypedFormGroup;
  actionControl: UntypedFormControl;
  reasonControl: UntypedFormControl;
  dbcControl: UntypedFormControl;

  dbcs: IDesignatedBody[] = [];
  userDbcs: IDesignatedBody[] = [];
  actions: IAction[] = [];
  reasons: IReason[] = [];
  canSave = true;
  canCancel = false;

  addConnectionSelected = false;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public updateConnectionsService: UpdateConnectionsService
  ) {}

  ngOnInit(): void {
    this.bindFormControl();
    this.dbcs$.subscribe((res) => {
      this.dbcs = res || [];
      this.userDbcs =
        res?.filter(
          (r) =>
            this.authService.userDesignatedBodies.includes(r.dbc) &&
            r.dbc !== this.currentDoctorDbcCode
        ) || [];
    });

    this.updateConnectionsService.canSave$.subscribe(
      (result) => (this.canSave = result)
    );

    this.updateConnectionsService.canCancel$.subscribe(
      (result) => (this.canCancel = result)
    );

    this.updateConnectionsService.actions$.subscribe(
      (result) => (this.actions = result)
    );
  }

  onSubmit() {
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
    this.updateConnectionForm = new UntypedFormGroup({});

    this.actionControl = new UntypedFormControl(null, Validators.required);
    this.reasonControl = new UntypedFormControl(null, Validators.required);
    this.dbcControl = new UntypedFormControl(null, Validators.required);

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
          this.reasons = this.actions.find(
            (arm) => arm.action === action
          )?.reasons;
          this.reasonControl.updateValueAndValidity();
        }
      })
    );

    this.updateConnectionForm.addControl("action", this.actionControl);
    this.updateConnectionForm.addControl("reason", this.reasonControl);
  }
}
