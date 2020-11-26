import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";

import { environment } from "@environment";
import { IConnectionHistory } from "./connection.interfaces";
import { ConnectionState } from "./state/connection.state";
import { AuthService } from "../core/auth/auth.service";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import { ConnectionService } from "./services/connection.service";
import { ADMIN_ROLES } from "../connections/constants";
import { IDesignatedBody } from "../reference/reference.interfaces";
import { ReferenceService } from "../reference/services/reference.service";
import { ActionType } from "../update-connections/update-connections.interfaces";

@Component({
  selector: "app-connection",
  templateUrl: "./connection.component.html",
  styleUrls: ["./connection.component.scss"]
})
export class ConnectionComponent implements OnInit, OnDestroy {
  @Select(ConnectionState.connectionHistory)
  public connectionHistory$: Observable<IConnectionHistory[]>;

  @Select(ConnectionState.gmcNumber)
  public gmcNumber$: Observable<number>;

  @Select(ConnectionState.doctorCurrentDbc)
  public doctorCurrentDbc$: Observable<string>;

  dateFormat = environment.dateFormat;
  columnsToDisplay = [
    "programmeName",
    "programmeOwner",
    "designatedBodyCode",
    "connectionStatus",
    "programmeMembershipStartDate",
    "programmeMembershipEndDate"
  ];
  componentSubscription: Subscription;
  dbcs: IDesignatedBody[] = [];
  gmcNumber: number;
  doctorCurrentDbc: string;

  enableUpdateConnection = false;
  submitting = false;

  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private connectionService: ConnectionService,
    private referenceService: ReferenceService
  ) {}

  ngOnInit(): void {
    this.enableUpdateConnection = this.authService.roles.some((role) =>
      ADMIN_ROLES.includes(role)
    );

    this.gmcNumber$.subscribe((res) => (this.gmcNumber = res));
    this.doctorCurrentDbc$.subscribe((res) => (this.doctorCurrentDbc = res));
    this.referenceService.getDbcs().subscribe((res) => (this.dbcs = res));
    this.connectionService.canSave$.next(true);
  }

  ngOnDestroy(): void {
    if (this.componentSubscription) {
      this.componentSubscription.unsubscribe();
    }
  }

  getDBCAbbrevation(dbc: string) {
    return this.dbcs.find((d) => d.dbc === dbc)?.abbr || dbc;
  }

  updateConnection(formValue: any) {
    this.submitting = true;
    let subscription: Observable<any>;
    switch (formValue.action) {
      case ActionType.ADD_CONNECTION:
        subscription = this.connectionService.addConnection({
          changeReason: formValue.reason,
          designatedBodyCode: formValue.dbc,
          doctors: [
            {
              gmcId: this.gmcNumber,
              currentDesignatedBodyCode: this.doctorCurrentDbc
            }
          ]
        });
        break;

      case ActionType.REMOVE_CONNECTION:
        subscription = this.connectionService.removeConnection({
          changeReason: formValue.reason,
          designatedBodyCode: null,
          doctors: [
            {
              gmcId: this.gmcNumber,
              currentDesignatedBodyCode: this.doctorCurrentDbc
            }
          ]
        });
        break;

      default:
        this.snackBarService.openSnackBar("Please select an action");
        this.submitting = false;
        return;
    }

    if (subscription) {
      this.componentSubscription = subscription.subscribe(
        (response) => {
          this.snackBarService.openSnackBar(response);
        },
        (error) => {
          this.snackBarService.openSnackBar(error);
        },
        () => {
          this.submitting = false;
        }
      );
    }
  }
}
