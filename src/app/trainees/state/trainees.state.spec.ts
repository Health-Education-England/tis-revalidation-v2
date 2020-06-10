import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../../shared/records/services/records.service";
import { DEFAULT_SORT } from "../../shared/records/constants";
import { mockTraineesResponse } from "../services/trainees.service.spec";
import { TraineesFilterType } from "../trainees.interfaces";
import {
  ClearSearch,
  Filter,
  Get,
  GetError,
  Paginate,
  ResetPaginator,
  Search,
  Sort
} from "./trainees.actions";
import { TraineesState } from "./trainees.state";

describe("Trainees state", () => {
  let store: Store;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule
      ],
      providers: [RecordsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    recordsService = TestBed.inject(RecordsService);
  }));

  it("should select 'TraineesState'", () => {
    const traineesState = store.selectSnapshot(TraineesState);
    expect(traineesState).toBeTruthy();
  });

  it("should dispatch 'Get' and invoke `getHandler`", () => {
    spyOn(recordsService, "getRecords").and.returnValue(of({}));
    store
      .dispatch(new Get())
      .subscribe(() => expect(recordsService.getRecords).toHaveBeenCalled());
  });

  it("should dispatch 'Get' and select 'trainees' slice", () => {
    spyOn(recordsService, "getRecords").and.returnValue(
      of(mockTraineesResponse)
    );

    store.dispatch(new Get()).subscribe(() => {
      const items = store.snapshot().trainees.items;
      expect(items.length).toEqual(2);
      expect(items[0].doctorFirstName).toEqual("Bobby");
    });
  });

  it("should dispatch 'Get' and select 'countTotal' slice", () => {
    spyOn(recordsService, "getRecords").and.returnValue(
      of(mockTraineesResponse)
    );

    store.dispatch(new Get()).subscribe(() => {
      const countTotal = store.snapshot().trainees.countTotal;
      expect(countTotal).toEqual(21312);
    });
  });

  it("should dispatch 'GetError' and select 'error' slice", () => {
    const mockError = new HttpErrorResponse({
      status: 404,
      statusText: "Not Found",
      url: "/trainees",
      error: {
        message: "Http failure response for /trainees: 404 Not Found"
      }
    });

    store.dispatch(new GetError(mockError));
    const error = store.snapshot().trainees.error;
    expect(error).toEqual(`Error: ${mockError.error.message}`);
  });

  it("should dispatch 'Sort' and update store", () => {
    store.dispatch(new Sort(DEFAULT_SORT.active, DEFAULT_SORT.direction));
    const sort = store.snapshot().trainees.sort;
    expect(sort).toEqual(DEFAULT_SORT);
  });

  it("should dispatch 'Paginate' and update store", () => {
    store.dispatch(new Paginate(34));
    const pageIndex = store.snapshot().trainees.pageIndex;
    expect(pageIndex).toEqual(34);
  });

  it("should dispatch 'ResetPaginator' and update store", () => {
    store.dispatch(new ResetPaginator());
    const pageIndex = store.snapshot().trainees.pageIndex;
    expect(pageIndex).toEqual(0);
  });

  it("should dispatch 'Search' and update store", () => {
    store.dispatch(new Search("smith"));
    const searchQuery = store.snapshot().trainees.searchQuery;
    expect(searchQuery).toEqual("smith");
  });

  it("should dispatch 'ClearSearch' and update store", () => {
    store.dispatch(new ClearSearch());
    const searchQuery = store.snapshot().trainees.searchQuery;
    expect(searchQuery).toBeNull();
  });

  it("should dispatch 'Filter' with `underNotice` and update store", () => {
    store.dispatch(new Filter(TraineesFilterType.UNDER_NOTICE));
    const filter = store.snapshot().trainees.filter;
    expect(filter).toEqual(TraineesFilterType.UNDER_NOTICE);
  });

  it("should dispatch 'Filter' with `allDoctors` and update store", () => {
    store.dispatch(new Filter(TraineesFilterType.ALL_DOCTORS));
    const filter = store.snapshot().trainees.filter;
    expect(filter).toEqual(TraineesFilterType.ALL_DOCTORS);
  });
});
