import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { IUpdateConnectionResponse } from "../connection/connection.interfaces";
import { ConnectionService } from "../connection/services/connection.service";
import { EnableUpdateConnections } from "../connections/state/connections.actions";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import { ActionType } from "../update-connections/update-connections.interfaces";
import { RecordsService } from "./services/records.service";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.scss"]
})
export class RecordsComponent implements OnDestroy {
  componentSubscription: Subscription;

  public enableUpdateConnection$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableUpdateConnections
  );

  public items$: Observable<any[]> = this.store.select(
    (state) => state[this.recordsService.stateName].items
  );

  public selectedItems = [];
  public isConnectionsSummary: boolean;

  constructor(
    private store: Store,
    private recordsService: RecordsService,
    private connectionService: ConnectionService,
    private snackBarService: SnackBarService
  ) {
    this.isConnectionsSummary = this.recordsService.stateName === "connections";

    this.items$.subscribe((items) => {
      if (items) {
        this.selectedItems = items.filter((item) => item.checked);
        this.connectionService.canSave$.next(this.selectedItems.length > 0);
      }
    });
  }
  ngOnDestroy(): void {
    this.componentSubscription.unsubscribe();
  }

  updateConnections(formValue: any) {
    if (this.selectedItems.length > 0) {
      const doctors = this.selectedItems.map((item) => ({
        gmcId: item.gmcReferenceNumber,
        currentDesignatedBodyCode: item.designatedBody
      }));

      const payload = {
        changeReason: formValue.reason,
        designatedBodyCode:
          formValue.action === ActionType.ADD_CONNECTION ? formValue.dbc : null,
        doctors
      };

      const action =
        formValue.action === ActionType.ADD_CONNECTION ? "add" : "remove";
      this.componentSubscription = this.connectionService
        .updateConnection(payload, action)
        .subscribe(
          (response: IUpdateConnectionResponse) => {
            this.snackBarService.openSnackBar(response.message);
          },
          (error) => {
            this.snackBarService.openSnackBar(error.message);
          },
          () => {
            this.store.dispatch(new EnableUpdateConnections(false));
            this.recordsService.enableAllocateAdmin(false);
            this.recordsService.get();
          }
        );
    } else {
      alert("Please select doctors to update connections");
    }
  }
}
