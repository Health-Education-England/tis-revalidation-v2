import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { Router, Params } from "@angular/router";
import { Store } from "@ngxs/store";
import { BehaviorSubject, forkJoin, Observable, Subject } from "rxjs";
import { switchMap, take } from "rxjs/operators";

import {
  FormControlBase,
  AutocompleteControl
} from "src/app/shared/form-controls/form-contol-base.model";
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
  ToggleConcernsCheckbox
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
  SetConnectionsTableFilters,
  ClearConnectionsTableFilters,
  UpdateConnectionsQueryParams
} from "../../connections/state/connections.actions";
import {
  ClearRecommendationsSearch,
  EnableRecommendationsAllocateAdmin,
  FilterRecommendations,
  GetRecommendations,
  PaginateRecommendations,
  RecommendationsSearch,
  ResetRecommendationsFilter,
  ResetRecommendationsPaginator,
  ResetRecommendationsSort,
  SortRecommendations,
  ToggleAllRecommendationsCheckboxes,
  ToggleRecommendationsCheckbox,
  SetRecommendationsTableFilters,
  ClearRecommendationsTableFilters,
  UpdateRecommendationsQueryParams
} from "../../recommendations/state/recommendations.actions";
import { IFilter, IRecordDataCell, ITableFilters } from "../records.interfaces";

@Injectable({
  providedIn: "root"
})
export class RecordsService {
  public resetSearchForm$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public onTableFilterFormReset = new Subject<void>();
  public toggleTableFilterPanel$: BehaviorSubject<boolean> =
    new BehaviorSubject(true);

  public stateName: string;
  public dateColumns: string[];
  public columnData: IRecordDataCell[];
  public detailsRoute: string;
  public summaryRoute: string;
  public filters: IFilter[];
  public showTableFilters: boolean;
  public tableFiltersFormData: BehaviorSubject<
    (FormControlBase | AutocompleteControl)[]
  > = new BehaviorSubject([]);

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
  public setTableFiltersAction: any;
  public clearTableFiltersAction: any;
  public updateQueryParamsAction: any;

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
    this.setTableFiltersAction = SetRecommendationsTableFilters;
    this.clearTableFiltersAction = ClearRecommendationsTableFilters;
    this.updateQueryParamsAction = UpdateRecommendationsQueryParams;
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
    this.setTableFiltersAction = SetConnectionsTableFilters;
    this.clearTableFiltersAction = ClearConnectionsTableFilters;
    this.updateQueryParamsAction = UpdateConnectionsQueryParams;
  }

  public getRecords<T>(endPoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(endPoint, { params });
  }

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

  public resetTableFiltersForm(): void {
    this.onTableFilterFormReset.next();
  }
  private buildQueryParamsForRoute() {
    const snapshot: any = this.store.snapshot()[this.stateName];
    const params = {
      active: snapshot.sort.active,
      direction: snapshot.sort.direction,
      pageIndex: snapshot.pageIndex,
      filter: snapshot.filter,
      ...(snapshot.searchQuery && { searchQuery: snapshot.searchQuery })
    };
    const tableFilters = snapshot.tableFilters;
    if (tableFilters) {
      for (const key of Object.keys(tableFilters)) {
        if (Array.isArray(tableFilters[key])) {
          params[key] = tableFilters[key].join(",");
        } else {
          params[key] = tableFilters[key];
        }
      }
    }
    return params;
  }

  public updateRoute(): Promise<boolean> {
    const current = this.router.url.split("?")[0];

    return this.router.navigate([current], {
      queryParams: this.buildQueryParamsForRoute()
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

  public setTableFilters(filters: ITableFilters): Observable<any> {
    this.handleUndefinedAction("setTableFilters");
    return this.store.dispatch(new this.setTableFiltersAction(filters));
  }

  public clearTableFilters(): Observable<any> {
    this.handleUndefinedAction("clearTableFilters");
    return this.store.dispatch(new this.clearTableFiltersAction());
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

  public toFormGroup(controls: FormControlBase[], formData: any = {}) {
    const group: any = {};

    for (const control of controls) {
      group[control.key] = new UntypedFormControl(
        formData[control.key] || control.initialValue || ""
      );
    }
    return new UntypedFormGroup(group);
  }

  public updateQueryParams(params: Params): Observable<any> {
    this.handleUndefinedAction("updateQueryParams");
    return this.store.dispatch(new this.updateQueryParamsAction(params));
  }
}
