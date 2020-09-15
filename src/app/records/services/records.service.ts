import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import {
  ClearConcernsSearch,
  ConcernsSearch,
  EnableConcernsAllocateAdmin,
  FilterConcerns,
  GetConcerns,
  PaginateConcerns,
  ResetConcernsFilter,
  ResetConcernsPaginator,
  ResetConcernsSort,
  SortConcerns,
  ToggleAllConcernsCheckboxes,
  ToggleConcernsCheckbox,
  SelectConcernsColumnFilters,
  ResetConcernsColumnFilters
} from "../../concerns/state/concerns.actions";
import {
  ClearConnectionsSearch,
  ConnectionsSearch,
  EnableConnectionsAllocateAdmin,
  FilterConnections,
  GetConnections,
  PaginateConnections,
  ResetConnectionsFilter,
  ResetConnectionsPaginator,
  ResetConnectionsSort,
  SortConnections,
  ToggleAllConnectionsCheckboxes,
  ToggleConnectionsCheckbox,
  SelectConnectionsColumnFilters,
  ResetConnectionsColumnFilters
} from "../../connections/state/connections.actions";
import {
  ClearRecommendationsSearch,
  EnableRecommendationsAllocateAdmin,
  FilterRecommendations,
  GetRecommendations,
  PaginateRecommendations,
  RecommendationsSearch,
  ResetRecommendationsColumnFilters,
  ResetRecommendationsFilter,
  ResetRecommendationsPaginator,
  ResetRecommendationsSort,
  SelectRecommendationsColumnFilters,
  SortRecommendations,
  ToggleAllRecommendationsCheckboxes,
  ToggleRecommendationsCheckbox
} from "../../recommendations/state/recommendations.actions";
import { IFilter, IRecordDataCell } from "../records.interfaces";

@Injectable({
  providedIn: "root"
})
export class RecordsService {
  public resetSearchForm$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public stateName: string;
  public dateColumns: string[];
  public columnData: IRecordDataCell[];
  public detailsRoute: string;
  public filters: IFilter[];

  // TODO type these
  public clearSearchAction: any;
  public filterAction: any;
  public getAction: any;
  public paginateAction: any;
  public resetFilterAction: any;
  public resetPaginatorAction: any;
  public resetSortAction: any;
  public searchAction: any;
  public sortAction: any;
  public enableAllocateAdminAction: any;
  public toggleCheckboxAction: any;
  public toggleAllCheckboxesAction: any;
  public selectColumnFiltersAction: any;
  public resetColumnFiltersAction: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  public setRecommendationsActions(): void {
    this.clearSearchAction = ClearRecommendationsSearch;
    this.filterAction = FilterRecommendations;
    this.getAction = GetRecommendations;
    this.paginateAction = PaginateRecommendations;
    this.resetFilterAction = ResetRecommendationsFilter;
    this.resetPaginatorAction = ResetRecommendationsPaginator;
    this.resetSortAction = ResetRecommendationsSort;
    this.searchAction = RecommendationsSearch;
    this.sortAction = SortRecommendations;
    this.enableAllocateAdminAction = EnableRecommendationsAllocateAdmin;
    this.toggleCheckboxAction = ToggleRecommendationsCheckbox;
    this.toggleAllCheckboxesAction = ToggleAllRecommendationsCheckboxes;
    this.selectColumnFiltersAction = SelectRecommendationsColumnFilters;
    this.resetColumnFiltersAction = ResetRecommendationsColumnFilters;
  }

  public setConcernsActions(): void {
    this.clearSearchAction = ClearConcernsSearch;
    this.filterAction = FilterConcerns;
    this.getAction = GetConcerns;
    this.paginateAction = PaginateConcerns;
    this.resetFilterAction = ResetConcernsFilter;
    this.resetPaginatorAction = ResetConcernsPaginator;
    this.resetSortAction = ResetConcernsSort;
    this.searchAction = ConcernsSearch;
    this.sortAction = SortConcerns;
    this.enableAllocateAdminAction = EnableConcernsAllocateAdmin;
    this.toggleCheckboxAction = ToggleConcernsCheckbox;
    this.toggleAllCheckboxesAction = ToggleAllConcernsCheckboxes;
    this.selectColumnFiltersAction = SelectConcernsColumnFilters;
    this.resetColumnFiltersAction = ResetConcernsColumnFilters;
  }

  public setConnectionsActions(): void {
    this.clearSearchAction = ClearConnectionsSearch;
    this.filterAction = FilterConnections;
    this.getAction = GetConnections;
    this.paginateAction = PaginateConnections;
    this.resetFilterAction = ResetConnectionsFilter;
    this.resetPaginatorAction = ResetConnectionsPaginator;
    this.resetSortAction = ResetConnectionsSort;
    this.searchAction = ConnectionsSearch;
    this.sortAction = SortConnections;
    this.enableAllocateAdminAction = EnableConnectionsAllocateAdmin;
    this.toggleCheckboxAction = ToggleConnectionsCheckbox;
    this.toggleAllCheckboxesAction = ToggleAllConnectionsCheckboxes;
    this.selectColumnFiltersAction = SelectConnectionsColumnFilters;
    this.resetColumnFiltersAction = ResetConnectionsColumnFilters;
  }

  public getRecords<T>(endPoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(endPoint, { params });
  }

  // TODO conditionally set new column filters params
  public generateParams(snapshot: any): HttpParams {
    let params: HttpParams = new HttpParams()
      .set("sortColumn", snapshot.sort.active)
      .set("sortOrder", snapshot.sort.direction)
      .set("pageNumber", snapshot.pageIndex.toString());

    if (snapshot.searchQuery) {
      params = params.append("searchQuery", snapshot.searchQuery);
    }

    return params;
  }

  /**
   * This method gets the current state and current route,
   * Then updates the current route by amending the query params,
   * Which is reflected in the browser url
   *
   * Note: Same route navigation doesn't re trigger angular life cycle hooks
   * which effectively means the components do not get reinstantiated
   * which is great for performance.
   */
  public updateRoute(): Promise<boolean> {
    const snapshot: any = this.store.snapshot()[this.stateName];
    const current = this.router.url.split("?")[0];
    return this.router.navigate([current], {
      queryParams: {
        active: snapshot.sort.active,
        direction: snapshot.sort.direction,
        pageIndex: snapshot.pageIndex,
        filter: snapshot.filter,
        ...(snapshot.searchQuery && { searchQuery: snapshot.searchQuery })
      }
    });
  }

  public get(): Observable<any> {
    this.handleUndefinedAction("getAction");
    return this.store.dispatch(new this.getAction());
  }

  public sort(active: string, direction): Observable<any> {
    this.handleUndefinedAction("sortAction");
    return this.store.dispatch(new this.sortAction(active, direction));
  }

  public resetSort(): Observable<any> {
    this.handleUndefinedAction("resetSortAction");
    return this.store.dispatch(new this.resetSortAction());
  }

  public paginate(pageIndex: number): Observable<any> {
    this.handleUndefinedAction("paginateAction");
    return this.store.dispatch(new this.paginateAction(pageIndex));
  }

  public resetFilters(): Observable<any> {
    this.handleUndefinedAction("resetColumnFiltersAction");
    return this.store.dispatch(new this.resetColumnFiltersAction());
  }

  public selectFilter(filterName: { [x: string]: any }): Observable<any> {
    this.handleUndefinedAction("selectColumnFiltersAction");
    return this.store.dispatch(new this.selectColumnFiltersAction(filterName));
  }

  public resetPaginator(): Observable<any> {
    this.handleUndefinedAction("resetPaginatorAction");
    return this.store.dispatch(new this.resetPaginatorAction());
  }

  public search(searchQuery: string): Observable<any> {
    this.handleUndefinedAction("searchAction");
    return this.store.dispatch(new this.searchAction(searchQuery));
  }

  public clearSearch(): Observable<any> {
    this.handleUndefinedAction("clearSearchAction");
    return this.store.dispatch(new this.clearSearchAction());
  }

  public filter(filter: string): Observable<any> {
    this.handleUndefinedAction("filterAction");
    return this.store.dispatch(new this.filterAction(filter));
  }

  public resetFilter(): Observable<any> {
    this.handleUndefinedAction("resetFilterAction");
    return this.store.dispatch(new this.resetFilterAction());
  }

  public resetSortPageAndSearch(): Observable<any> {
    return forkJoin([
      this.resetSort(),
      this.resetPaginator(),
      this.clearSearch()
    ]);
  }

  public resetRecordsState(): Observable<any> {
    return this.resetSortPageAndSearch().pipe(
      take(1),
      switchMap(() => this.resetFilter())
    );
  }

  private handleUndefinedAction(actionName: string): void {
    if (!this[actionName]) {
      throw new Error(`${actionName} must be defined`);
    }
  }

  public enableAllocateAdmin(enableAllocateAdmin: boolean): Observable<any> {
    this.handleUndefinedAction("enableAllocateAdminAction");

    return this.store.dispatch(
      new this.enableAllocateAdminAction(enableAllocateAdmin)
    );
  }

  public toggleCheckbox(gmcReferenceNumber: string): Observable<any> {
    this.handleUndefinedAction("toggleCheckboxAction");

    return this.store.dispatch(
      new this.toggleCheckboxAction(gmcReferenceNumber)
    );
  }

  public toggleAllCheckboxes(): Observable<any> {
    this.handleUndefinedAction("toggleAllCheckboxesAction");

    return this.store.dispatch(new this.toggleAllCheckboxesAction());
  }
}
