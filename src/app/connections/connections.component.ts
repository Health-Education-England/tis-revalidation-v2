import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable, Subscription, finalize } from "rxjs";
import { IUpdateConnectionResponse } from "../connection/connection.interfaces";
import { RecordsService } from "../records/services/records.service";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import {
  CONNECTION_ACTIONS,
  HIDE_DISCREPANCY_ACTION
} from "../update-connections/constants";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { EnableUpdateConnections } from "../update-connections/state/update-connections.actions";
import {
  ActionType,
  IAction
} from "../update-connections/update-connections.interfaces";
import { ConnectionsFilterType } from "./connections.interfaces";
import { AuthService } from "../core/auth/auth.service";

@Component({
  selector: "app-connections",
  template:
    "<app-records (updateConnections)='updateConnections($event)' [loading]='loading'> </app-records>"
})
export class ConnectionsComponent implements OnDestroy {
  componentSubscription: Subscription;

  public filter$: Observable<ConnectionsFilterType> = this.store.select(
    (state) => state[this.recordsService.stateName].filter
  );

  public items$: Observable<any[]> = this.store.select(
    (state) => state[this.recordsService.stateName].items
  );

  public selectedItems = [];
  public loading = false;

  constructor(
    private store: Store,
    private recordsService: RecordsService,
    private authService: AuthService,
    private updateConnectionsService: UpdateConnectionsService,
    private snackBarService: SnackBarService
  ) {
    this.updateConnectionsService.canCancel$.next(true);

    this.items$.subscribe((items) => {
      if (items) {
        this.selectedItems = items.filter((item) => item.checked);
        this.updateConnectionsService.canSave$.next(
          this.selectedItems.length > 0
        );
      }
    });

    this.filter$.subscribe((filter) => {
      let actions: IAction[];
      if (filter === ConnectionsFilterType.DISCREPANCIES) {
        actions = [...CONNECTION_ACTIONS, { ...HIDE_DISCREPANCY_ACTION }];
      } else {
        actions = [...CONNECTION_ACTIONS];
      }
      this.updateConnectionsService.actions$.next(actions);
    });
  }

  updateConnections(formValue: any) {
    if (this.selectedItems.length > 0) {
      this.loading = true;
      const doctors = this.selectedItems.map((item) => ({
        gmcId: item.gmcReferenceNumber,
        currentDesignatedBodyCode: item.designatedBody,
        programmeOwnerDesignatedBodyCode: item.tcsDesignatedBody
      }));

      const admin = this.authService.userName;
      const adminDesignatedBodyCodes = this.authService.userDesignatedBodies;
      let payload: {};
      if (formValue.action === ActionType.HIDE_DISCREPANCY) {
        payload = {
          adminDesignatedBodyCodes,
          doctors,
          hiddenBy: admin,
          hiddenUntilDate: formValue.hideUntil.format("YYYY-MM-DD"),
          reason: formValue.reason
        };

        this.componentSubscription = this.updateConnectionsService
          .hideDiscrepancy(payload)
          .subscribe({
            next: () => {
              this.snackBarService.openSnackBar(
                "Discrepancies hidden successfully"
              );
            },
            error: (error) => {
              this.snackBarService.openSnackBar(error.message);
              this.onCompleteUpdate();
            },
            complete: () => {
              this.onCompleteUpdate();
            }
          });
      } else {
        payload = {
          changeReason: formValue.reason,
          designatedBodyCode:
            formValue.action === ActionType.ADD_CONNECTION
              ? formValue.dbc
              : null,
          doctors,
          admin: admin
        };

        this.componentSubscription = this.updateConnectionsService
          .updateConnection(payload, formValue.action)
          .pipe(finalize(() => this.onCompleteUpdate()))
          .subscribe({
            next: (response: IUpdateConnectionResponse) => {
              this.snackBarService.openSnackBar(response.message);
            },
            error: (error) => {
              this.snackBarService.openSnackBar(error.message);
            }
          });
      }
    } else {
      this.snackBarService.openSnackBar(
        "Please select doctors to update connections"
      );
    }
  }

  onCompleteUpdate() {
    this.store.dispatch(new EnableUpdateConnections(false));
    this.recordsService.enableAllocateAdmin(false);
    this.recordsService.get();
    this.loading = false;
  }

  ngOnDestroy(): void {
    if (this.componentSubscription) {
      this.componentSubscription.unsubscribe();
      this.updateConnectionsService.enableUpdateConnections(false);
    }
  }
}
