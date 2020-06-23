import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from "@angular/core";
import { Sort as ISort } from "@angular/material/sort/sort";
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  Router,
  RouterEvent
} from "@angular/router";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";
import { IRecordDataCell } from "../records.interfaces";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-record-list",
  templateUrl: "./record-list.component.html"
})
export class RecordListComponent implements OnChanges, OnDestroy {
  @Input() public columnData: IRecordDataCell[];
  @Input() public dateColumns: string[];
  @Input() public detailsRoute: string;
  @Input() public stateName: string;

  private subscription: Subscription;
  public dateFormat: string = environment.dateFormat;
  public params: Params;

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
    protected activatedRoute: ActivatedRoute,
    protected recordsService: RecordsService,
    protected router: Router,
    protected store: Store
  ) {}

  /**
   * Set state name
   * And fetch data
   * Then setup route change subscription
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.recordsService.stateName = this.stateName;
    this.recordsService.get();
    this.handleRouteUpdates();
  }

  /**
   * Listen to route change event
   * And ensure queryParams match store
   * So that when route is updated via browser history navigation
   * Correct data is shown on the ui
   */
  public handleRouteUpdates(): void {
    this.subscription = this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.params = this.activatedRoute.snapshot.queryParams;
        const paramsExist: boolean = Object.keys(this.params).length > 0;

        if (paramsExist) {
          const state: any = this.store.selectSnapshot(
            (snapshot) => snapshot[this.stateName]
          );

          this.checkSorting(state);
          this.checkPagination(state);
          this.checkSearchQuery(state);
          this.checkFilter(state);
        } else {
          this.recordsService.resetRecordsState();
        }
        this.recordsService.get(); // TODO move to resolver?
      });
  }

  public get columnNames(): string[] {
    return this.columnData.map((i) => i.name);
  }

  public navigateToDetails(event: Event, row: any): Promise<boolean> {
    event.stopPropagation();
    return this.router.navigate([this.detailsRoute, row.gmcReferenceNumber]);
  }

  public checkSorting(state: any): void {
    if (
      this.params.active !== state.sort.active &&
      this.params.direction !== state.sort.direction
    ) {
      this.recordsService.sort(this.params.active, this.params.direction);
    }
  }

  public checkPagination(state: any): void {
    if (Number(this.params.pageIndex) !== state.pageIndex) {
      this.recordsService.paginate(Number(this.params.pageIndex));
    }
  }

  public checkSearchQuery(state: any): void {
    if (
      this.params.searchQuery &&
      this.params.searchQuery !== state.searchQuery
    ) {
      this.recordsService.search(this.params.searchQuery);
    }
  }

  public checkFilter(state: any): void {
    if (this.params.filter !== state.filter) {
      this.recordsService.filter(this.params.filter);
    }
  }

  public sort(event: ISort): void {
    this.recordsService.sort(event.active, event.direction);
    this.recordsService
      .resetPaginator()
      .pipe(take(1))
      .subscribe(() => this.recordsService.updateRoute());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
