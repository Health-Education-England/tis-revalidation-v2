import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription, combineLatest } from "rxjs";

import { environment } from "@environment";
import {
  IConnectionHistory,
  IHiddenDiscrepancy,
  IShowDiscrepancyParameters,
  IUpdateConnectionResponse
} from "./connection.interfaces";
import { ConnectionState } from "./state/connection.state";
import { AuthService } from "../core/auth/auth.service";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import { IDesignatedBody } from "../reference/reference.interfaces";
import {
  ActionType,
  IDoctor
} from "../update-connections/update-connections.interfaces";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { Get } from "./state/connection.actions";
import { DetailsSideNavState } from "../details/details-side-nav/state/details-side-nav.state";
import { IDetailsSideNav } from "../details/details-side-nav/details-side-nav.interfaces";
import { ConnectionService } from "./services/connection.service";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel
} from "../shared/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FormatDesignatedBodyPipe } from "../shared/pipes/format-designated-body.pipe";
import {
  CONNECTION_ACTIONS,
  HIDE_DISCREPANCY_ACTION
} from "../update-connections/constants";

@Component({
  selector: "app-connection",
  templateUrl: "./connection.component.html"
})
export class ConnectionComponent implements OnInit, OnDestroy {
  @Select(ConnectionState.connectionHistory)
  public connectionHistory$: Observable<IConnectionHistory[]>;

  @Select(ConnectionState.hiddenDiscrepancies)
  public hiddenDiscrepancies$: Observable<IHiddenDiscrepancy[]>;

  @Select(ConnectionState.gmcNumber)
  public gmcNumber$: Observable<number>;

  @Select(ConnectionState.doctorCurrentDbc)
  public doctorCurrentDbc$: Observable<string>;

  @Select(DetailsSideNavState.traineeDetails)
  traineeDetails$: Observable<IDetailsSideNav>;

  dateFormat = environment.dateFormat;
  connectionsColumnsToDisplay = [
    "newDesignatedBodyCode",
    "previousDesignatedBodyCode",
    "requestType",
    "reasonMessage",
    "responseMessage",
    "requestTime",
    "updatedBy"
  ];
  hiddenDiscrepanciesColumnsToDisplay = [
    "hiddenForDesignatedBodyCode",
    "hiddenBy",
    "reason",
    "hiddenDateTime",
    "id"
  ];
  readonly subscriptions: Subscription = new Subscription();
  dbcs: IDesignatedBody[] = [];
  gmcNumber: number;
  doctorCurrentDbc: string;
  expandedElement: IConnectionHistory | null;
  enableUpdateConnection = false;
  submitting = false;
  programmeOwnerDBC: string;
  updatingDiscrepancyIds: string[] = [];
  constructor(
    private store: Store,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    readonly updateConnectionsService: UpdateConnectionsService,
    readonly connectionService: ConnectionService,
    public dialog: MatDialog,
    readonly formatDesignatedBodyPipe: FormatDesignatedBodyPipe
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest({
        gmcNumber: this.gmcNumber$,
        doctorCurrentDbc: this.doctorCurrentDbc$,
        traineeDetails: this.traineeDetails$
      }).subscribe(({ gmcNumber, doctorCurrentDbc, traineeDetails }) => {
        this.gmcNumber = gmcNumber;
        this.doctorCurrentDbc = doctorCurrentDbc;
        this.enableUpdateConnection =
          this.authService.isRevalAdmin &&
          traineeDetails.programmeMembershipType !== "Military" &&
          traineeDetails.currentGrade !== "Foundation Year 1";

        let actions = [...CONNECTION_ACTIONS];
        const programmeOwner = traineeDetails?.programmeOwner;
        if (
          programmeOwner &&
          doctorCurrentDbc &&
          programmeOwner !== doctorCurrentDbc
        ) {
          actions = [...CONNECTION_ACTIONS, { ...HIDE_DISCREPANCY_ACTION }];
        }
        this.updateConnectionsService.actions$.next(actions);
      })
    );

    this.updateConnectionsService.canSave$.next(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  showDiscrepancy(params: IShowDiscrepancyParameters) {
    const formattedDbc = this.formatDesignatedBodyPipe.transform(
      params.hiddenForDesignatedBodyCode,
      "abbr"
    );
    const dialogData = new ConfirmDialogModel(
      "Show discrepancy",
      `Are you sure you want to show this discrepancy for ${formattedDbc}?`,
      "Cancel",
      "Show"
    );
    this.dialog
      .open(ConfirmDialogComponent, { data: dialogData })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updatingDiscrepancyIds.push(params.discrepancyId);
          this.connectionService
            .showDiscrepancy(params.discrepancyId)
            .subscribe({
              next: () => {
                this.snackBarService.openSnackBar(
                  `Update successful. Discrepancy will now appear on the discrepancies list for admins assigned to ${formattedDbc} designated body.`
                );
                this.updatingDiscrepancyIds =
                  this.updatingDiscrepancyIds.filter(
                    (id) => id !== params.discrepancyId
                  );
                this.store.dispatch(new Get(this.gmcNumber));
              },
              error: () => {
                this.updatingDiscrepancyIds =
                  this.updatingDiscrepancyIds.filter(
                    (id) => id !== params.discrepancyId
                  );
                this.snackBarService.openSnackBar(
                  "An error occurred while showing the discrepancy. Please try again."
                );

                this.store.dispatch(new Get(this.gmcNumber));
              }
            });
        }
      });
  }

  updateConnection(formValue: any) {
    const admin = this.authService.userName;
    this.submitting = true;
    const doctors: IDoctor[] = [
      {
        gmcId: this.gmcNumber,
        currentDesignatedBodyCode: this.doctorCurrentDbc
      }
    ];

    const payload = {
      changeReason: formValue.reason,
      designatedBodyCode:
        formValue.action === ActionType.ADD_CONNECTION ? formValue.dbc : null,
      doctors,
      admin
    };
    this.subscriptions.add(
      this.updateConnectionsService
        .updateConnection(payload, formValue.action)
        .subscribe({
          next: (response: IUpdateConnectionResponse) => {
            this.snackBarService.openSnackBar(response.message);
            this.store.dispatch(new Get(this.gmcNumber));
          },
          error: (error) => {
            this.snackBarService.openSnackBar(error.message);
            this.submitting = false;
          },
          complete: () => {
            this.submitting = false;
          }
        })
    );
  }
}
