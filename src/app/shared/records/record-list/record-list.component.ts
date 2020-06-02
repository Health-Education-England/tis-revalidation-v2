import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Sort as ISort } from "@angular/material/sort/sort";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { IRecordDataCell } from "../records.interfaces";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-record-list",
  templateUrl: "./record-list.component.html"
})
export class RecordListComponent implements OnChanges {
  @Input() public stateName: string;
  @Input() public detailsRoute: string;
  @Input() public dateColumns: string[];
  @Input() public columnData: IRecordDataCell[];

  public dateFormat: string = environment.dateFormat;
  public params: Params = this.route.snapshot.queryParams;

  public loading$: Observable<boolean> = this.store.select(
    (state) => state[this.stateName].loading
  );
  public items$: Observable<any[]> = this.store.select(
    (state) => state[this.stateName].items
  );
  public totalResults$: Observable<number> = this.store.select(
    (state) => state[this.stateName].totalResults
  );
  public sort$: Observable<ISort> = this.store.select(
    (state) => state[this.stateName].sort
  );
  public error$: Observable<string> = this.store.select(
    (state) => state[this.stateName].error
  );

  constructor(
    protected recordsService: RecordsService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected store: Store
  ) {}

  /**
   * Set state name,
   * Then check if query params exist
   * Then dispatch appropriate events
   * And update store accordingly
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.recordsService.stateName = this.stateName;
    this.setupInitialSorting();
    this.setupInitialPagination();
    this.checkInitialSearchQuery();
    this.recordsService.get();
  }

  public get columnNames(): string[] {
    return this.columnData.map((i) => i.name);
  }

  public navigateToDetails(event: Event, row: any): Promise<boolean> {
    event.stopPropagation();
    return this.router.navigate([this.detailsRoute, row.gmcReferenceNumber]);
  }

  public setupInitialSorting(): void {
    if (this.params.active && this.params.direction) {
      this.recordsService.sort(this.params.active, this.params.direction);
    } else {
      this.recordsService.resetSort();
    }
  }

  public setupInitialPagination(): void {
    if (this.params.pageIndex) {
      this.recordsService.paginate(this.params.pageIndex);
    } else {
      this.recordsService.resetPaginator();
    }
  }

  public checkInitialSearchQuery(): void {
    if (this.params.searchQuery) {
      this.recordsService.search(this.params.searchQuery);
    }
  }

  public sort(event: ISort): void {
    this.recordsService.sort(event.active, event.direction);
    this.recordsService.resetPaginator();
    this.recordsService
      .get()
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }
}
