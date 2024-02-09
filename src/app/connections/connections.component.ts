import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { IUpdateConnectionResponse } from "../connection/connection.interfaces";
import { RecordsService } from "../records/services/records.service";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import { CONNECTION_ACTIONS } from "../update-connections/constants";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { EnableUpdateConnections } from "../update-connections/state/update-connections.actions";
import { ActionType } from "../update-connections/update-connections.interfaces";
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
  currentFilter: string;
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
        if (this.currentFilter === ConnectionsFilterType.DISCREPANCIES) {
          let selectedItems: any[] = items?.filter((item) => item.checked);
          let actions = CONNECTION_ACTIONS;
          let selectedActions = [];
          if (selectedItems?.length) {
            if (selectedItems.every((item) => item.designatedBody)) {
              selectedActions = actions.filter(
                (c) => c.action === ActionType.REMOVE_CONNECTION
              );
            } else if (
              selectedItems.every((checked) => !checked.designatedBody)
            ) {
              selectedActions = actions.filter(
                (c) => c.action === ActionType.ADD_CONNECTION
              );
            }
          }

          this.updateConnectionsService.actions$.next(selectedActions);
        }
      }
    });

    this.filter$.subscribe((filter) => {
      let actions = CONNECTION_ACTIONS;
      this.currentFilter = filter;
      switch (filter) {
        case ConnectionsFilterType.HIDDEN:
          actions = actions.filter(
            (c) => c.action !== ActionType.HIDE_CONNECTION
          );
          break;

        case ConnectionsFilterType.CURRENT_CONNECTIONS:
          actions = actions.filter(
            (c) => c.action !== ActionType.ADD_CONNECTION
          );
          break;
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

      const payload = {
        changeReason: formValue.reason,
        designatedBodyCode:
          formValue.action === ActionType.ADD_CONNECTION ? formValue.dbc : null,
        doctors,
        admin: admin
      };

      this.componentSubscription = this.updateConnectionsService
        .updateConnection(payload, formValue.action)
        .subscribe({
          next: (response: IUpdateConnectionResponse) => {
            this.snackBarService.openSnackBar(response.message);
          },
          error: (error) => {
            this.snackBarService.openSnackBar(error.message);
          },
          complete: () => {
            this.store.dispatch(new EnableUpdateConnections(false));
            this.recordsService.enableAllocateAdmin(false);
            this.recordsService.get();
            this.loading = false;
          }
        });
    } else {
      this.snackBarService.openSnackBar(
        "Please select doctors to update connections"
      );
    }
  }

  ngOnDestroy(): void {
    if (this.componentSubscription) {
      this.componentSubscription.unsubscribe();
      this.updateConnectionsService.enableUpdateConnections(false);
    }
  }
}
