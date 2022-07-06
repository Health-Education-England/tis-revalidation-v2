import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RecordsService } from "../../records/services/records.service";
import { defaultRecordsState } from "../../records/state/records.state";
import { ConnectionsFilterType } from "../connections.interfaces";
import { ConnectionsState } from "../state/connections.state";
import { ConnectionsService } from "./connections.service";
import { AuthService } from "../../core/auth/auth.service";

describe("ConnectionsService", () => {
  let connectionsService: ConnectionsService;
  let recordsService: RecordsService;
  let store: Store;
  let authService: AuthService;
  const sortColumn = "doctorFirstName";
  const sortDirection = "asc";
  const userLocalOffice = ["1-AIIDWT", "1-AIIDSA", "1-AIIDVS"];
  const connectionsState = {
    ...defaultRecordsState,
    sort: {
      active: sortColumn,
      direction: sortDirection
    },
    filter: ConnectionsFilterType.HISTORIC_CONNECTIONS,
    dbcs: userLocalOffice
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([ConnectionsState])
      ]
    });
    authService = TestBed.inject(AuthService);
    connectionsService = TestBed.inject(ConnectionsService);
    recordsService = TestBed.inject(RecordsService);
    store = TestBed.inject(Store);

    authService.userDesignatedBodies = userLocalOffice;

    store.reset({
      connections: connectionsState
    });
  });

  it("should be created", () => {
    expect(connectionsService).toBeTruthy();
  });

  it("`generateParams()` should return `HttpParams`", () => {
    spyOn(recordsService, "generateParams").and.callThrough();

    const httpParams = connectionsService.generateParams();

    expect(recordsService.generateParams).toHaveBeenCalled();
    expect(httpParams.get("sortColumn")).toBe(sortColumn);
    expect(httpParams.get("sortOrder")).toBe(sortDirection);
    expect(httpParams.get("dbcs")).toBe(userLocalOffice.join(","));
  });

  it("`getFilter()` should return `ConnectionsFilterType`", () => {
    spyOn(connectionsService, "getFilter").and.callThrough();

    const filter = connectionsService.getFilter();

    expect(connectionsService.getFilter).toHaveBeenCalled();
    expect(filter).toBe(ConnectionsFilterType.HISTORIC_CONNECTIONS);
  });
});
