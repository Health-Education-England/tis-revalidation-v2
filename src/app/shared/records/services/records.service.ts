import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { switchMap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RecordsService {
  public resetSearchForm$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public stateName: string;

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  public setActions(
    clearSearchAction,
    filterAction,
    getAction,
    paginateAction,
    resetFilterAction,
    resetPaginatorAction,
    resetSortAction,
    searchAction,
    sortAction,
    enableAllocateAdminAction
  ): void {
    this.clearSearchAction = clearSearchAction;
    this.filterAction = filterAction;
    this.getAction = getAction;
    this.paginateAction = paginateAction;
    this.resetFilterAction = resetFilterAction;
    this.resetPaginatorAction = resetPaginatorAction;
    this.resetSortAction = resetSortAction;
    this.searchAction = searchAction;
    this.sortAction = sortAction;
    this.enableAllocateAdminAction = enableAllocateAdminAction;
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
    if (!this.getAction) {
      throw new Error("getAction must be defined");
    }

    return this.store.dispatch(new this.getAction());
  }

  public sort(active: string, direction): Observable<any> {
    if (!this.sortAction) {
      throw new Error("sortActionFunction must be defined");
    }

    return this.store.dispatch(new this.sortAction(active, direction));
  }

  public resetSort(): Observable<any> {
    if (!this.resetSortAction) {
      throw new Error("resetSortAction must be defined");
    }

    return this.store.dispatch(new this.resetSortAction());
  }

  public paginate(pageIndex: number): Observable<any> {
    if (!this.paginateAction) {
      throw new Error("paginateAction must be defined");
    }

    return this.store.dispatch(new this.paginateAction(pageIndex));
  }

  public resetPaginator(): Observable<any> {
    if (!this.resetPaginatorAction) {
      throw new Error("resetPaginatorAction must be defined");
    }

    return this.store.dispatch(new this.resetPaginatorAction());
  }

  public search(searchQuery: string): Observable<any> {
    if (!this.searchAction) {
      throw new Error("searchAction must be defined");
    }

    return this.store.dispatch(new this.searchAction(searchQuery));
  }

  public clearSearch(): Observable<any> {
    if (!this.clearSearchAction) {
      throw new Error("clearSearchAction must be defined");
    }

    return this.store.dispatch(new this.clearSearchAction());
  }

  public filter(filter: any): Observable<any> {
    if (!this.filterAction) {
      throw new Error("filterAction must be defined");
    }

    return this.store.dispatch(new this.filterAction(filter));
  }

  public resetFilter(): Observable<any> {
    if (!this.resetFilterAction) {
      throw new Error("resetFilterAction must be defined");
    }

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

  public enableAllocateAdmin(enableAllocateAdmin: boolean): Observable<any> {
    if (!this.enableAllocateAdminAction) {
      throw new Error("enableAllocateAdminAction must be defined");
    }

    return this.store.dispatch(
      new this.enableAllocateAdminAction(enableAllocateAdmin)
    );
  }
}
