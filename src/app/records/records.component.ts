import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { IUpdateConnectionResponse } from "../connection/connection.interfaces";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { EnableUpdateConnections } from "../update-connections/state/update-connections.actions";
import { ActionType } from "../update-connections/update-connections.interfaces";
import { RecordsService } from "./services/records.service";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.scss"]
})
export class RecordsComponent implements OnDestroy {
  componentSubscription: Subscription;

  public enableUpdateConnections$: Observable<boolean> = this.store.select(
    (state) =>
      state[this.updateConnectionsService.stateName].enableUpdateConnections
  );

  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );

  public items$: Observable<any[]> = this.store.select(
    (state) => state[this.recordsService.stateName].items
  );

  public selectedItems = [];
  public loading = false;

  constructor(
    private store: Store,
    private recordsService: RecordsService,
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
  }
  ngOnDestroy(): void {
    if (this.componentSubscription) {
      this.componentSubscription.unsubscribe();
      this.updateConnectionsService.enableUpdateConnections(false);
    }
  }

  updateConnections(formValue: any) {
    if (this.selectedItems.length > 0) {
      this.loading = true;
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

      this.componentSubscription = this.updateConnectionsService
        .updateConnection(payload, formValue.action)
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
            this.loading = false;
          }
        );
    } else {
      this.snackBarService.openSnackBar(
        "Please select doctors to update connections"
      );
    }
  }
}
