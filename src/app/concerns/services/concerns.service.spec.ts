import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RecordsService } from "../../records/services/records.service";
import { defaultRecordsState } from "../../records/state/records.state";
import { ConcernsState } from "../state/concerns.state";

import { ConcernsService } from "./concerns.service";

describe("ConcernsService", () => {
  let concernsService: ConcernsService;
  let recordsService: RecordsService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([ConcernsState])
      ]
    });
    concernsService = TestBed.inject(ConcernsService);
    recordsService = TestBed.inject(RecordsService);
    store = TestBed.inject(Store);
  });

  it("should be created", () => {
    expect(concernsService).toBeTruthy();
  });

  it("`generateParams()` should return `HttpParams`", () => {
    spyOn(recordsService, "generateParams").and.callThrough();

    const sortColumn = "doctorFirstName";
    const sortDirection = "asc";
    const concernsState = {
      ...defaultRecordsState,
      sort: {
        active: sortColumn,
        direction: sortDirection
      }
    };

    store.reset({
      concerns: concernsState
    });

    const httpParams = concernsService.generateParams();

    expect(recordsService.generateParams).toHaveBeenCalled();
    expect(httpParams.get("sortColumn")).toBe(sortColumn);
    expect(httpParams.get("sortOrder")).toBe(sortDirection);
  });
});
