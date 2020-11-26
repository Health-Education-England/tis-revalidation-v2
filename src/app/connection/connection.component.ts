import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";

import { environment } from "@environment";
import { IConnectionHistory, IDesignatedBody } from "./connection.interfaces";
import { ConnectionState } from "./state/connection.state";
import { AuthService } from "../core/auth/auth.service";
import { ActionType, ADMIN_ROLES } from "./constants";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import { ConnectionService } from "./services/connection.service";

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
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.enableUpdateConnection = this.authService.roles.some((role) =>
      ADMIN_ROLES.includes(role)
    );

    this.dbcs$.subscribe((res) => {
      this.dbcs = res;
    });
    this.gmcNumber$.subscribe((res) => (this.gmcNumber = res));
    this.doctorCurrentDbc$.subscribe((res) => (this.doctorCurrentDbc = res));
  }

  setSubmitting(value: boolean) {
    this.submitting = value;
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
          gmcId: this.gmcNumber
        });
        break;

      case ActionType.REMOVE_CONNECTION:
        subscription = this.connectionService.removeConnection({
          changeReason: formValue.reason,
          designatedBodyCode: this.doctorCurrentDbc,
          gmcId: this.gmcNumber
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
