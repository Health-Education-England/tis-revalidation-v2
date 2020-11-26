import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ClearAllocateList } from "../admins/state/admins.actions";
import { ConnectionService } from "../connection/services/connection.service";
import { EnableUpdateConnections } from "../connections/state/connections.actions";
import { RecordsService } from "./services/records.service";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.scss"]
})
export class RecordsComponent {
  public enableUpdateConnection$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableUpdateConnections
  );

  public items$: Observable<any[]> = this.store.select(
    (state) => state[this.recordsService.stateName].items
  );

  public selectedItems: any[];
  public isConnectionsSummary: boolean;

  constructor(
    private store: Store,
    private recordsService: RecordsService,
    private connectionService: ConnectionService
  ) {
    this.isConnectionsSummary = this.recordsService.stateName === "connections";

    this.items$.subscribe((items) => {
      if (items) {
        this.selectedItems = items.filter((item) => item.checked);
        this.connectionService.canSave$.next(this.selectedItems.length > 0);
      }
    });
  }

  updateConnections(formValue: any) {
    if (this.selectedItems && this.selectedItems.length > 0) {
      const doctors = this.selectedItems.map((item) => ({
        gmcId: item.gmcReferenceNumber,
        currentDesignatedBodyCode: item.designatedBody
      }));

      const payload = {
        changeReason: formValue.reason,
        designatedBodyCode: formValue.dbc,
        doctors
      };

      this.connectionService.addConnection(JSON.stringify(payload)).subscribe(
        () => {},
        () => {},
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
