import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { UpdateConnectionsService } from "src/app/update-connections/services/update-connections.service";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-reset-record-list",
  templateUrl: "./reset-record-list.component.html"
})
export class ResetRecordListComponent {
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );

  public enableUpdateConnections$: Observable<boolean> = this.store.select(
    (state) =>
      state[this.updateConnectionsService.stateName].enableUpdateConnections
  );

  constructor(
    private store: Store,
    private recordsService: RecordsService,
    private updateConnectionsService: UpdateConnectionsService
  ) {}

  public resetRecordList(): void {
    this.recordsService.resetSearchForm$.next(true);
    this.recordsService
      .resetRecordsState()
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
