import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from "@angular/common/http/testing";
import { TestBed, async, fakeAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "@environment";
import { NgxsModule, Store } from "@ngxs/store";
import {
  ClearConnectionsSearch,
  ConnectionsSearch,
  FilterConnections,
  GetConnections,
  PaginateConnections,
  ResetConnectionsFilter,
  ResetConnectionsPaginator,
  ResetConnectionsSort,
  SortConnections,
  ToggleAllConnectionsCheckboxes,
  ToggleConnectionsCheckbox
} from "./connections.actions";
import { ConnectionsState } from "./connections.state";
import { mockConnectionsResponse } from "../mock-data/connections-spec-data";
import { ConnectionsService } from "../services/connections.service";
import { HttpParams } from "@angular/common/http";
import { ConnectionsFilterType, IConnection } from "../connections.interfaces";
import { DEFAULT_SORT } from "src/app/records/constants";

describe("Connections state", () => {
  let store: Store;
  let httpMock: HttpTestingController;
  let connectionsService: ConnectionsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([ConnectionsState])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    connectionsService = TestBed.inject(ConnectionsService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it("should select 'ConnectionsState'", () => {
    const connectionsState = store.selectSnapshot(ConnectionsState);
    expect(connectionsState).toBeTruthy();
  });

  function setUpGetRequest(
    filter: ConnectionsFilterType,
    path: string
  ): TestRequest {
    spyOn(connectionsService, "getFilter").and.callFake(() => filter);
    spyOn(connectionsService, "generateParams").and.callFake(() => {
      return new HttpParams()
        .set("sortColumn", "gmcReferenceNumber")
        .set("sortOrder", "asc")
        .set("pageNumber", "0")
        .set("filter", filter);
    });

    store.dispatch(new GetConnections());

    return httpMock.expectOne(
      `${environment.appUrls.getConnections}${path}?sortColumn=gmcReferenceNumber&sortOrder=asc&pageNumber=0&filter=${filter}`
    );
  }

  [
    { filter: ConnectionsFilterType.ALL, apiPath: "" },
    { filter: ConnectionsFilterType.HIDDEN, apiPath: "/hidden" },
    { filter: ConnectionsFilterType.EXCEPTIONS_QUEUE, apiPath: "/exception" }
  ].forEach((testCase) => {
    it(`should have ${testCase.filter} connections when GetConnections is dispatched`, fakeAsync(() => {
      const req = setUpGetRequest(testCase.filter, testCase.apiPath);
      req.flush(mockConnectionsResponse);
      const connections = store.selectSnapshot(
        (state) => state.connections.items
      );

      expect(connections).toEqual(mockConnectionsResponse.connections);

      const totalResults = store.selectSnapshot(
        (state) => state.connections.totalResults
      );

      expect(totalResults).toEqual(mockConnectionsResponse.totalResults);

      httpMock.verify();
    }));

    it(`should have ${testCase.filter} connections when GetConnections is dispatched and API failed`, fakeAsync(() => {
      const req = setUpGetRequest(testCase.filter, testCase.apiPath);
      const mockErrorResponse = { status: 400, statusText: "Bad Request" };
      const data = "Invalid request parameters";
      req.flush(data, mockErrorResponse);

      const error = store.selectSnapshot((state) => state.connections.error);

      expect(error.statusText).toEqual("Bad Request");
      expect(error.status).toEqual(400);
      httpMock.verify();
    }));
  });

  it("should reset filter to ALL when ResetConnectionsFilter is dispatched", () => {
    store.dispatch(new ResetConnectionsFilter());
    const filter = store.selectSnapshot((state) => state.connections.filter);

    expect(filter).toBe(ConnectionsFilterType.ALL);
  });

  it("should set the filter when FilterConnections is dispatched", () => {
    store.dispatch(new FilterConnections(ConnectionsFilterType.DISCONNECTED));
    const filter = store.selectSnapshot((state) => state.connections.filter);

    const disableSearchAndSort = store.selectSnapshot(
      (state) => state.connections.disableSearchAndSort
    );

    expect(filter).toBe(ConnectionsFilterType.DISCONNECTED);
    expect(disableSearchAndSort).toBeTruthy();
  });

  it("should not disableSearchAndSort when FilterConnections is dispatched with ALL filter", () => {
    store.dispatch(new FilterConnections(ConnectionsFilterType.ALL));
    const filter = store.selectSnapshot((state) => state.connections.filter);

    const disableSearchAndSort = store.selectSnapshot(
      (state) => state.connections.disableSearchAndSort
    );

    expect(filter).toBe(ConnectionsFilterType.ALL);
    expect(disableSearchAndSort).toBeFalsy();
  });

  it("should set searchQuery when ConnectionsSearch is dispatched", () => {
    store.dispatch(new ConnectionsSearch("search term"));

    const searchQuery = store.selectSnapshot(
      (state) => state.connections.searchQuery
    );

    expect(searchQuery).toBe("search term");
  });

  it("should reset searchQuery when ClearConnectionsSearch is dispatched", () => {
    store.dispatch(new ClearConnectionsSearch());

    const searchQuery = store.selectSnapshot(
      (state) => state.connections.searchQuery
    );

    expect(searchQuery).toBe(null);
  });

  it("should set pageIndex when PaginateConnections is dispatched", () => {
    store.dispatch(new PaginateConnections(10));

    const pageIndex = store.selectSnapshot(
      (state) => state.connections.pageIndex
    );

    expect(pageIndex).toBe(10);
  });

  it("should set pageIndex to 0 when ResetConnectionsPaginator is dispatched", () => {
    store.dispatch(new ResetConnectionsPaginator());

    const pageIndex = store.selectSnapshot(
      (state) => state.connections.pageIndex
    );

    expect(pageIndex).toBe(0);
  });

  it("should set sort column and direction when SortConnections is dispatched", () => {
    store.dispatch(new SortConnections("columnName", "asc"));

    const column = store.selectSnapshot(
      (state) => state.connections.sort.active
    );

    const direction = store.selectSnapshot(
      (state) => state.connections.sort.direction
    );

    expect(column).toBe("columnName");
    expect(direction).toBe("asc");
  });

  it("should reset sort column and direction when ResetConnectionsSort is dispatched", () => {
    store.dispatch(new ResetConnectionsSort());

    const column = store.selectSnapshot(
      (state) => state.connections.sort.active
    );

    const direction = store.selectSnapshot(
      (state) => state.connections.sort.direction
    );

    expect(column).toBe(DEFAULT_SORT.active);
    expect(direction).toBe(DEFAULT_SORT.direction);
  });

  it("should toggle checkbox when ToggleConnectionsCheckbox is dispatched", () => {
    const gmcReferenceNumber = "9856987";
    store.reset({
      connections: {
        items: mockConnectionsResponse.connections
      }
    });
    store.dispatch(new ToggleConnectionsCheckbox(gmcReferenceNumber));

    const selectedItem: IConnection = store.selectSnapshot((state) =>
      state.connections.items.find(
        (item) => item.gmcReferenceNumber === gmcReferenceNumber
      )
    );

    expect(selectedItem.checked).toBeTruthy();
  });

  it("should toggle all checkboxes when ToggleAllConnectionsCheckboxes is dispatched", () => {
    store.reset({
      connections: {
        items: mockConnectionsResponse.connections,
        allChecked: false
      }
    });
    store.dispatch(new ToggleAllConnectionsCheckboxes());

    const items: IConnection[] = store.selectSnapshot(
      (state) => state.connections.items
    );

    items.forEach((item) => {
      if (
        item.programmeMembershipType === "Military" ||
        item.programmeName.includes("Foundation")
      ) {
        expect(item.checked).toBeFalsy();
      } else {
        expect(item.checked).toBeTruthy();
      }
    });
  });
});
