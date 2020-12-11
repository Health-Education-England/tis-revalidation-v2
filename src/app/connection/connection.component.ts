import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";

import { environment } from "@environment";
import {
  IConnectionHistory,
  IProgrammeHistory,
  IUpdateConnectionResponse
} from "./connection.interfaces";
import { ConnectionState } from "./state/connection.state";
import { AuthService } from "../core/auth/auth.service";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import { ADMIN_ROLES } from "../connections/constants";
import { IDesignatedBody } from "../reference/reference.interfaces";
import { ReferenceService } from "../reference/services/reference.service";
import { ActionType } from "../update-connections/update-connections.interfaces";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { Get } from "./state/connection.actions";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

@Component({
  selector: "app-connection",
  templateUrl: "./connection.component.html",
  styleUrls: ["./connection.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class ConnectionComponent implements OnInit, OnDestroy {
  @Select(ConnectionState.connectionHistory)
  public connectionHistory$: Observable<IConnectionHistory[]>;

  @Select(ConnectionState.programmeHistory)
  public programmeHistory$: Observable<IProgrammeHistory[]>;

  @Select(ConnectionState.gmcNumber)
  public gmcNumber$: Observable<number>;

  @Select(ConnectionState.doctorCurrentDbc)
  public doctorCurrentDbc$: Observable<string>;

  dateFormat = environment.dateFormat;
  programmeColumnsToDisplay = [
    "programmeName",
    "programmeOwner",
    "programmeMembershipType",
    "programmeMembershipStartDate",
    "programmeMembershipEndDate"
  ];
  connectionsColumnsToDisplay = [
    "newDesignatedBodyCode",
    "previousDesignatedBodyCode",
    "requestType",
    "reasonMessage",
    "requestTime"
  ];
  componentSubscription: Subscription;
  dbcs: IDesignatedBody[] = [];
  gmcNumber: number;
  doctorCurrentDbc: string;
  expandedElement: IConnectionHistory | null;
  enableUpdateConnection = false;
  submitting = false;

  constructor(
    private store: Store,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private updateConnectionsService: UpdateConnectionsService,
    private referenceService: ReferenceService
  ) {}

  ngOnInit(): void {
    this.enableUpdateConnection = this.authService.roles.some((role) =>
      ADMIN_ROLES.includes(role)
    );

    this.gmcNumber$.subscribe((res) => (this.gmcNumber = res));
    this.doctorCurrentDbc$.subscribe((res) => (this.doctorCurrentDbc = res));
    this.referenceService.getDbcs().subscribe((res) => (this.dbcs = res));
    this.updateConnectionsService.canSave$.next(true);
  }

  ngOnDestroy(): void {
    if (this.componentSubscription) {
      this.componentSubscription.unsubscribe();
    }
  }

  getDBCAbbreviation(dbc: string) {
    if (dbc) {
      return this.dbcs.find((d) => d.dbc === dbc)?.abbr || dbc;
    }

    return "";
  }

  updateConnection(formValue: any) {
    this.submitting = true;
    const doctors = [
      {
        gmcId: this.gmcNumber,
        currentDesignatedBodyCode: this.doctorCurrentDbc
      }
    ];

    const payload = {
      changeReason: formValue.reason,
      designatedBodyCode:
        formValue.action === ActionType.ADD_CONNECTION ? formValue.dbc : null,
      doctors
    };

    const action =
      formValue.action === ActionType.ADD_CONNECTION ? "add" : "remove";

    this.componentSubscription = this.updateConnectionsService
      .updateConnection(payload, action)
      .subscribe(
        (response: IUpdateConnectionResponse) => {
          this.snackBarService.openSnackBar(response.message);
          this.store.dispatch(new Get(this.gmcNumber));
        },
        (error) => {
          this.snackBarService.openSnackBar(error.message);
        },
        () => {
          this.submitting = false;
        }
      );
  }

  currentExpanded(element: any, event: Event) {
    event.stopPropagation();
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
