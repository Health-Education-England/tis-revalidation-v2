import { Component, OnDestroy, OnInit } from "@angular/core";
import { Sort as ISort } from "@angular/material/sort";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { UpdateConnectionsService } from "src/app/update-connections/services/update-connections.service";
import { ClearAllocateList } from "../../admins/state/admins.actions";
import { IRecordDataCell } from "../records.interfaces";
import { RecordsService } from "../services/records.service";
import { LocalService } from "src/app/shared/services/local/local.service";

@Component({
  selector: "app-record-list",
  templateUrl: "./record-list.component.html",
  styleUrls: ["./record-list.component.scss"]
})
export class RecordListComponent implements OnDestroy, OnInit {
  public columnData: IRecordDataCell[] = this.recordsService.columnData;
  public dateColumns: string[] = this.recordsService.dateColumns;
  public detailsRoute: string = this.recordsService.detailsRoute;

  public dateFormat: string = environment.dateFormat;
  public params: Params;

  public allChecked$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].allChecked
  );
  public someChecked$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].someChecked
  );
  public loading$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].loading
  );
  public items$: Observable<any[]> = this.store.select(
    (state) => state[this.recordsService.stateName].items
  );
  public totalResults$: Observable<number> = this.store.select(
    (state) => state[this.recordsService.stateName].totalResults
  );
  public sort$: Observable<ISort> = this.store.select(
    (state) => state[this.recordsService.stateName].sort
  );
  public error$: Observable<string> = this.store.select(
    (state) => state[this.recordsService.stateName].error
  );
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );
  public enableUpdateConnections$: Observable<boolean> = this.store.select(
    (state) =>
      state[this.updateConnectionsService.stateName].enableUpdateConnections
  );
  public disableSearchAndSort$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].disableSearchAndSort
  );

  public fixedColumns$: Observable<boolean> = this.store.select(
    (state) => state.recordList.fixedColumns
  );

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected recordsService: RecordsService,
    protected router: Router,
    protected store: Store,
    private updateConnectionsService: UpdateConnectionsService,
    private localService: LocalService
  ) {}
  columnNames: string[];

  /**
   * Handler method for navigating from summary to details screen
   * Only allow navigation if allocation admin mode isn't enabled
   * @param event - Mouse or keyboard event
   * @param row - record i.e recommendation / concern / connection
   * @param enableAllocateAdmin - boolean value
   */
  public navigateToDetails(
    event: Event,
    row: any,
    enableAllocateAdmin: boolean,
    enableUpdateConnections: boolean
  ) {
    event.stopPropagation();
    if (!enableAllocateAdmin && !enableUpdateConnections) {
      this.router.navigate([this.detailsRoute, row.gmcReferenceNumber]);
    }
  }

  public sort(event: ISort): void {
    this.recordsService.sort(event.active, event.direction);
    this.recordsService
      .resetPaginator()
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }

  public toggleAllCheckboxes(): void {
    this.recordsService.toggleAllCheckboxes();
  }

  public toggleCheckbox(gmcReferenceNumber: string): void {
    this.recordsService.toggleCheckbox(gmcReferenceNumber);
  }

  public showCheckbox(
    enableAllocateAdmin: boolean,
    enableUpdateConnections: boolean,
    columnName: string
  ) {
    return (
      (enableAllocateAdmin || enableUpdateConnections) &&
      columnName === "doctorFirstName"
    );
  }

  ngOnInit(): void {
    if (this.localService.customLocalData?.connectionsTableColumns?.length) {
      this.columnNames =
        this.localService.customLocalData.connectionsTableColumns;
    } else {
      this.columnNames = this.columnData
        .filter((cd) => !cd.hidden)
        .map((c) => c.name);
    }

    this.recordsService.columnsToDisplay$.subscribe((columnNames) => {
      this.columnNames = columnNames;
    });
  }
  ngOnDestroy() {
    this.store.dispatch(new ClearAllocateList());
  }
}
