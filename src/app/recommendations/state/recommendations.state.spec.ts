import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../../records/services/records.service";
import { DEFAULT_SORT } from "../../records/constants";
import { mockRecommendationsResponse } from "../services/recommendations.service.spec";
import { RecommendationsFilterType } from "../recommendations.interfaces";
import {
  ClearRecommendationsSearch,
  FilterRecommendations,
  GetRecommendations,
  GetRecommendationsError,
  PaginateRecommendations,
  ResetRecommendationsPaginator,
  RecommendationsSearch,
  SortRecommendations
} from "./recommendations.actions";
import { RecommendationsState } from "./recommendations.state";

describe("Recommendations state", () => {
  let store: Store;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([RecommendationsState]),
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

  it("should select 'RecommendationsState'", () => {
    const state = store.selectSnapshot(RecommendationsState);
    expect(state).toBeTruthy();
  });

  it("should dispatch 'Get' and invoke `getHandler`", () => {
    spyOn(recordsService, "getRecords").and.returnValue(of({}));
    store
      .dispatch(new GetRecommendations())
      .subscribe(() => expect(recordsService.getRecords).toHaveBeenCalled());
  });

  it("should dispatch 'Get' and select 'recommendations' slice", () => {
    spyOn(recordsService, "getRecords").and.returnValue(
      of(mockRecommendationsResponse)
    );

    store.dispatch(new GetRecommendations()).subscribe(() => {
      const items = store.snapshot().recommendations.items;
      expect(items.length).toEqual(2);
      expect(items[0].doctorFirstName).toEqual("Bobby");
    });
  });

  it("should dispatch 'Get' and select 'countTotal' slice", () => {
    spyOn(recordsService, "getRecords").and.returnValue(
      of(mockRecommendationsResponse)
    );

    store.dispatch(new GetRecommendations()).subscribe(() => {
      const countTotal = store.snapshot().recommendations.countTotal;
      expect(countTotal).toEqual(21312);
    });
  });

  it("should dispatch 'GetError' and select 'error' slice", () => {
    const mockError =
      "Http failure response for /recommendations: 404 Not Found";

    store.dispatch(new GetRecommendationsError(mockError));
    const error = store.snapshot().recommendations.error;
    expect(error).toEqual(mockError);
  });

  it("should dispatch 'Sort' and update store", () => {
    store.dispatch(
      new SortRecommendations(DEFAULT_SORT.active, DEFAULT_SORT.direction)
    );
    const sort = store.snapshot().recommendations.sort;
    expect(sort).toEqual(DEFAULT_SORT);
  });

  it("should dispatch 'Paginate' and update store", () => {
    store.dispatch(new PaginateRecommendations(34));
    const pageIndex = store.snapshot().recommendations.pageIndex;
    expect(pageIndex).toEqual(34);
  });

  it("should dispatch 'ResetPaginator' and update store", () => {
    store.dispatch(new ResetRecommendationsPaginator());
    const pageIndex = store.snapshot().recommendations.pageIndex;
    expect(pageIndex).toEqual(0);
  });

  it("should dispatch 'Search' and update store", () => {
    store.dispatch(new RecommendationsSearch("smith"));
    const searchQuery = store.snapshot().recommendations.searchQuery;
    expect(searchQuery).toEqual("smith");
  });

  it("should dispatch 'ClearSearch' and update store", () => {
    store.dispatch(new ClearRecommendationsSearch());
    const searchQuery = store.snapshot().recommendations.searchQuery;
    expect(searchQuery).toBeNull();
  });

  it("should dispatch 'Filter' with `underNotice` and update store", () => {
    store.dispatch(
      new FilterRecommendations(RecommendationsFilterType.UNDER_NOTICE)
    );
    const filter = store.snapshot().recommendations.filter;
    expect(filter).toEqual(RecommendationsFilterType.UNDER_NOTICE);
  });

  it("should dispatch 'Filter' with `allDoctors` and update store", () => {
    store.dispatch(
      new FilterRecommendations(RecommendationsFilterType.ALL_DOCTORS)
    );
    const filter = store.snapshot().recommendations.filter;
    expect(filter).toEqual(RecommendationsFilterType.ALL_DOCTORS);
  });
});
