import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "@environment";
import { NgxsModule, Store } from "@ngxs/store";
import { DEFAULT_SORT } from "../../../concerns/constants";
import {
  Get,
  Paginate,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "../../../concerns/state/concerns.actions";
import {
  TraineesState,
  TraineesStateModel
} from "../../../trainees/state/trainees.state";
import { defaultRecordsState } from "../state/records.state";

import { RecordsService } from "./records.service";

describe("RecordsService", () => {
  let service: RecordsService;
  let http: HttpTestingController;
  let router: Router;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([TraineesState])
      ]
    });
    service = TestBed.inject(RecordsService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);

    service.setActions(Get, Sort, ResetSort, Paginate, ResetPaginator, Search);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("`getRecords()` should call api", () => {
    const endPoint = `${environment.appUrls.getTrainees}`;
    service.getRecords(endPoint).subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("GET");

    http.verify();
  });

  it("`generateParams()` should return `HttpParams`", () => {
    const sortColumn = "doctorFirstName";
    const sortDirection = "asc";
    const connectionsState = {
      ...defaultRecordsState,
      searchQuery: "mr jones",
      sort: {
        active: sortColumn,
        direction: sortDirection
      }
    };

    store.reset({
      connections: connectionsState
    });

    const httpParams = service.generateParams(connectionsState);

    expect(httpParams.get("sortColumn")).toBe(sortColumn);
    expect(httpParams.get("sortOrder")).toBe(sortDirection);
    expect(httpParams.get("searchQuery")).toBe(connectionsState.searchQuery);
  });

  it("`updateRoute()` should invoke router navigation", () => {
    spyOn(router, "navigate");

    const snapshot: TraineesStateModel = store.snapshot().trainees;
    service.stateName = "trainees";
    service.updateRoute();

    expect(router.navigate).toHaveBeenCalledWith(["/"], {
      queryParams: {
        active: snapshot.sort.active,
        direction: snapshot.sort.direction,
        pageIndex: snapshot.pageIndex,
        filter: snapshot.filter,
        ...(snapshot.searchQuery && { searchQuery: snapshot.searchQuery })
      }
    });
  });

  it("`get()` should return error if `getAction` isn't defined", () => {
    service.getAction = null;

    service.get().subscribe(
      () => {},
      (err) => expect(err).toBe("getAction must be defined")
    );
  });

  it("`get()` should trigger appropriate action", () => {
    spyOn(store, "dispatch");
    service.get();
    expect(store.dispatch).toHaveBeenCalledWith(new service.getAction());
  });

  it("`sort()` should return error if `sortAction` isn't defined", () => {
    service.sortAction = null;

    service.sort(DEFAULT_SORT.active, DEFAULT_SORT.direction).subscribe(
      () => {},
      (err) => expect(err).toBe("sortAction must be defined")
    );
  });

  it("`sort()` should trigger appropriate action", () => {
    spyOn(store, "dispatch");
    service.sort(DEFAULT_SORT.active, DEFAULT_SORT.direction);
    expect(store.dispatch).toHaveBeenCalledWith(
      new service.sortAction(DEFAULT_SORT.active, DEFAULT_SORT.direction)
    );
  });

  it("`resetSort()` should return error if `resetSortAction` isn't defined", () => {
    service.resetSortAction = null;

    service.resetSort().subscribe(
      () => {},
      (err) => expect(err).toBe("resetSortAction must be defined")
    );
  });

  it("`resetSort()` should trigger appropriate action", () => {
    spyOn(store, "dispatch");
    service.resetSort();
    expect(store.dispatch).toHaveBeenCalledWith(new service.resetSortAction());
  });

  it("`paginate()` should return error if `paginateAction` isn't defined", () => {
    service.paginateAction = null;

    service.paginate(4).subscribe(
      () => {},
      (err) => expect(err).toBe("paginateAction must be defined")
    );
  });

  it("`paginate()` should trigger appropriate action", () => {
    spyOn(store, "dispatch");
    service.paginate(2);
    expect(store.dispatch).toHaveBeenCalledWith(new service.paginateAction(2));
  });

  it("`resetPaginator()` should return error if `resetPaginatorAction` isn't defined", () => {
    service.resetPaginatorAction = null;

    service.resetPaginator().subscribe(
      () => {},
      (err) => expect(err).toBe("resetPaginatorAction must be defined")
    );
  });

  it("`resetPaginator()` should trigger appropriate action", () => {
    spyOn(store, "dispatch");
    service.resetPaginator();
    expect(store.dispatch).toHaveBeenCalledWith(
      new service.resetPaginatorAction()
    );
  });

  it("`search()` should return error if `searchAction` isn't defined", () => {
    service.searchAction = null;

    service.search("mr jones").subscribe(
      () => {},
      (err) => expect(err).toBe("searchAction must be defined")
    );
  });

  it("`search()` should trigger appropriate action", () => {
    spyOn(store, "dispatch");
    service.search("mr jones");
    expect(store.dispatch).toHaveBeenCalledWith(
      new service.searchAction("mr jones")
    );
  });
});
