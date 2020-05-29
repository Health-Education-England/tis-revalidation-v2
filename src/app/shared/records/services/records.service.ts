import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecordsService {
  public resetSearchForm$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public stateName: string;

  // TODO type these
  public getAction: any;
  public sortAction: any;
  public resetSortAction: any;
  public paginateAction: any;
  public resetPaginatorAction: any;
  public searchAction: any;

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient
  ) {}

  public setActions(
    getAction,
    sortAction,
    resetSortAction,
    paginateAction,
    resetPaginatorAction,
    searchAction
  ): void {
    this.getAction = getAction;
    this.sortAction = sortAction;
    this.resetSortAction = resetSortAction;
    this.paginateAction = paginateAction;
    this.resetPaginatorAction = resetPaginatorAction;
    this.searchAction = searchAction;
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
   * Then reloads the current route by updating the query params,
   * And hence updates the url in the browser
   *
   * Note: Same route navigation doesn't re trigger angular life cycle hooks
   * which effectively means the components do not get reinstantiated
   * which is great for performance.
   */
  // TODO once all remaining list related components have been refactored to be shared
  // remove route parameter as the route name can be grabbed from the service
  public updateRoute(route: string): Promise<boolean> {
    const snapshot: any = this.store.snapshot()[route];
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
}
