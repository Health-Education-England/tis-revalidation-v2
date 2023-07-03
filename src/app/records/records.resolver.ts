import { ActivatedRouteSnapshot, Params } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { RecordsService } from "./services/records.service";

export class RecordsResolver {
  constructor(
    protected store: Store,
    protected recordsService: RecordsService,
    protected updateConnectionsService: UpdateConnectionsService
  ) {}

  /**
   * Check to see if any query params exist
   * If query params exist then ensure store data matches
   * Otherwise reset store to default state
   * Then invoke api and fetch data
   * @param route ActivatedRouteSnapshot
   */

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.recordsService.updateQueryParams(route.queryParams);
    const paramsExist: boolean = Object.keys(route.queryParams).length > 0;
    if (paramsExist) {
      const state: any = this.store.selectSnapshot(
        (snapshot) => snapshot[this.recordsService.stateName]
      );
      this.checkSorting(route.queryParams, state);
      this.checkPagination(route.queryParams, state);
      this.checkSearchQuery(route.queryParams, state);
      this.checkFilter(route.queryParams, state);
    } else {
      this.recordsService.resetRecordsState();
      this.recordsService?.enableAllocateAdmin(false);
      this.updateConnectionsService?.enableUpdateConnections(false);
    }

    return this.recordsService.get();
  }

  private checkSorting(queryParams: Params, state: any): void {
    if (
      queryParams.active !== state.sort.active ||
      queryParams.direction !== state.sort.direction
    ) {
      this.recordsService.sort(queryParams.active, queryParams.direction);
    }
  }

  private checkPagination(queryParams: Params, state: any): void {
    if (Number(queryParams.pageIndex) !== state.pageIndex) {
      this.recordsService.paginate(Number(queryParams.pageIndex));
    }
  }

  /**
   * If searchQuery is not present in url
   * Then dispatch clearSearch event to update store
   * Otherwise ensure the searchQuery value matches store
   * @param queryParams Params
   * @param state any
   */
  private checkSearchQuery(queryParams: Params, state: any): void {
    if (!queryParams.searchQuery) {
      this.recordsService.clearSearch();
    } else if (queryParams.searchQuery !== state.searchQuery) {
      this.recordsService.search(queryParams.searchQuery);
    }
  }

  private checkFilter(queryParams: Params, state: any): void {
    if (
      queryParams.filter !== state.filter &&
      this.recordsService.filters.some(
        (filter) => filter.name === queryParams.filter
      )
    ) {
      this.recordsService.filter(queryParams.filter);
    }
  }
}
