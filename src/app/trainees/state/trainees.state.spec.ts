import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { DEFAULT_SORT } from "../constants";
import { TraineesFilterType } from "../trainees.interfaces";
import { TraineesService } from "../services/trainees.service";
import { MockTraineeService } from "../services/trainees.service.spec";
import { MaterialModule } from "../../shared/material/material.module";
import {
  Filter,
  ClearSearch,
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
  let traineeService: TraineesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule
      ],
      providers: [
        {
          provide: TraineesService,
          useClass: MockTraineeService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    traineeService = TestBed.inject(TraineesService);
  }));

  it("should select 'TraineesState'", () => {
    const traineesState = store.selectSnapshot(TraineesState);
    expect(traineesState).toBeTruthy();
  });

  it("should dispatch 'GetTrainees' and make api call", () => {
    spyOn(traineeService, "getTrainees").and.callThrough();
    store.dispatch(new Get());
    expect(traineeService.getTrainees).toHaveBeenCalled();
  });

  it("should dispatch 'GetTrainees' and select 'trainees' slice", () => {
    spyOn(traineeService, "getTrainees").and.callThrough();

    store.dispatch(new Get());
    const items = store.snapshot().trainees.items;

    expect(items.length).toEqual(2);
    expect(items[0].doctorFirstName).toEqual("Bobby");
  });

  it("should dispatch 'GetTrainees' and select 'countTotal' slice", () => {
    spyOn(traineeService, "getTrainees").and.callThrough();

    store.dispatch(new Get());
    const countTotal = store.snapshot().trainees.countTotal;

    expect(countTotal).toEqual(21312);
  });

  it("should dispatch 'GetTraineesError' and select 'error' slice", () => {
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

  it("should dispatch 'SortTrainees' and update store", () => {
    store.dispatch(new Sort(DEFAULT_SORT.active, DEFAULT_SORT.direction));
    const sort = store.snapshot().trainees.sort;
    expect(sort).toEqual(DEFAULT_SORT);
  });

  it("should dispatch 'PaginateTrainees' and update store", () => {
    store.dispatch(new Paginate(34));
    const pageIndex = store.snapshot().trainees.pageIndex;
    expect(pageIndex).toEqual(34);
  });

  it("should dispatch 'ResetTraineesPaginator' and update store", () => {
    store.dispatch(new ResetPaginator());
    const pageIndex = store.snapshot().trainees.pageIndex;
    expect(pageIndex).toEqual(0);
  });

  it("should dispatch 'SearchTrainees' and update store", () => {
    store.dispatch(new Search("smith"));
    const searchQuery = store.snapshot().trainees.searchQuery;
    expect(searchQuery).toEqual("smith");
  });

  it("should dispatch 'ClearTraineesSearch' and update store", () => {
    store.dispatch(new ClearSearch());
    const searchQuery = store.snapshot().trainees.searchQuery;
    expect(searchQuery).toBeNull();
  });

  it("should dispatch 'UnderNoticeFilter' and update store", () => {
    store.dispatch(new Filter(TraineesFilterType.UNDER_NOTICE));
    const filter = store.snapshot().trainees.filter;
    expect(filter).toEqual(TraineesFilterType.UNDER_NOTICE);
  });

  it("should dispatch 'AllDoctorsFilter' and update store", () => {
    store.dispatch(new Filter(TraineesFilterType.ALL_DOCTORS));
    const filter = store.snapshot().trainees.filter;
    expect(filter).toEqual(TraineesFilterType.ALL_DOCTORS);
  });
});
