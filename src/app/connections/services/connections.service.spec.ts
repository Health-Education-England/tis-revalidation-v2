import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RecordsService } from "../../shared/records/services/records.service";
import { defaultRecordsState } from "../../shared/records/state/records.state";
import { ConnectionsState } from "../state/connections.state";
import { ConnectionsService } from "./connections.service";

describe("ConnectionsService", () => {
  let connectionsService: ConnectionsService;
  let recordsService: RecordsService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([ConnectionsState])
      ]
    });
    connectionsService = TestBed.inject(ConnectionsService);
    recordsService = TestBed.inject(RecordsService);
    store = TestBed.inject(Store);
  });

  it("should be created", () => {
    expect(connectionsService).toBeTruthy();
  });

  it("`generateParams()` should return `HttpParams`", () => {
    spyOn(recordsService, "generateParams").and.callThrough();

    const sortColumn = "doctorFirstName";
    const sortDirection = "asc";
    const connectionsState = {
      ...defaultRecordsState,
      sort: {
        active: sortColumn,
        direction: sortDirection
      }
    };

    store.reset({
      connections: connectionsState
    });

    const httpParams = connectionsService.generateParams();

    expect(recordsService.generateParams).toHaveBeenCalled();
    expect(httpParams.get("sortColumn")).toBe(sortColumn);
    expect(httpParams.get("sortOrder")).toBe(sortDirection);
  });
});
