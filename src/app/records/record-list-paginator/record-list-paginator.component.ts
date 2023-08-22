import { Component } from "@angular/core";
import { LegacyPageEvent as PageEvent } from "@angular/material/legacy-paginator";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { UpdateConnectionsService } from "src/app/update-connections/services/update-connections.service";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-record-list-paginator",
  templateUrl: "./record-list-paginator.component.html"
})
export class RecordListPaginatorComponent {
  public totalResults$: Observable<number> = this.store.select(
    (state) => state[this.recordsService.stateName].totalResults
  );
  public pageIndex$: Observable<number> = this.store.select(
    (state) => state[this.recordsService.stateName].pageIndex
  );
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );
  public enableUpdateConnections$: Observable<boolean> = this.store.select(
    (state) =>
      state[this.updateConnectionsService.stateName].enableUpdateConnections
  );

  disablePaginator: boolean;

  constructor(
    private store: Store,
    private recordsService: RecordsService,
    private updateConnectionsService: UpdateConnectionsService
  ) {
    this.enableAllocateAdmin$.subscribe(
      (enableAllocateAdmin) => (this.disablePaginator = enableAllocateAdmin)
    );
    this.enableUpdateConnections$.subscribe(
      (enableUpdateConnections) =>
        (this.disablePaginator = enableUpdateConnections)
    );
  }

  /**
   * Leverage angular materials paginator
   * And dispatch event to store to update pageIndex
   * Then update route with new query param values
   * @param event PageEvent
   */
  public paginate(event: PageEvent): void {
    this.recordsService
      .paginate(Number(event.pageIndex))
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
