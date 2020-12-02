import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { UpdateConnectionsService } from "src/app/update-connections/services/update-connections.service";
import { IFilter, ITotalCounts } from "../records.interfaces";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-record-list-filters",
  templateUrl: "./record-list-filters.component.html"
})
export class RecordListFiltersComponent {
  public totalCounts$: Observable<ITotalCounts> = this.store.select(
    (state) => state[this.recordsService.stateName].totalCounts
  );
  public filter$: Observable<string> = this.store.select(
    (state) => state[this.recordsService.stateName].filter
  );
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );
  public enableUpdateConnections$: Observable<boolean> = this.store.select(
    (state) =>
      state[this.updateConnectionsService.stateName].enableUpdateConnections
  );
  public filters: IFilter[] = this.recordsService.filters;

  constructor(
    private store: Store,
    private recordsService: RecordsService,
    private updateConnectionsService: UpdateConnectionsService
  ) {}

  public filterRecords(filter: string): void {
    this.recordsService.filter(filter);
    this.recordsService
      .resetSortPageAndSearch()
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
