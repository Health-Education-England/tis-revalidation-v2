import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { DEFAULT_SORT } from "../../core/trainee/constants";
import { TraineeService } from "../../core/trainee/trainee.service";
import { MockTraineeService } from "../../core/trainee/trainee.service.spec";
import { MaterialModule } from "../../shared/material/material.module";
import {
  AllDoctorsFilter,
  ClearTraineesSearch,
  GetTrainees,
  PaginateTrainees,
  ResetTraineesPaginator,
  SearchTrainees,
  SortTrainees,
  UnderNoticeFilter
} from "./trainees.actions";
import { TraineesState } from "./trainees.state";

describe("Trainees state", () => {
  let store: Store;
  let traineeService: TraineeService;

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
          provide: TraineeService,
          useClass: MockTraineeService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    traineeService = TestBed.inject(TraineeService);
  }));

  it("should select 'TraineesState'", () => {
    const traineesState = store.selectSnapshot(TraineesState);
    expect(traineesState).toBeTruthy();
  });

  it("should dispatch 'GetTrainees' and make api call", () => {
    spyOn(traineeService, "getTrainees").and.callThrough();
    store.dispatch(new GetTrainees());
    expect(traineeService.getTrainees).toHaveBeenCalled();
  });

  it("should dispatch 'GetTrainees' and select 'trainees' slice", () => {
    spyOn(traineeService, "getTrainees").and.callThrough();

    store.dispatch(new GetTrainees());
    const trainees = store.selectSnapshot(TraineesState.trainees);

    expect(trainees.length).toEqual(2);
    expect(trainees[0].doctorFirstName).toEqual("Bobby");
  });

  it("should dispatch 'GetTrainees' and select 'countTotal' slice", () => {
    spyOn(traineeService, "getTrainees").and.callThrough();

    store.dispatch(new GetTrainees());
    const count = store.selectSnapshot(TraineesState.countTotal);

    expect(count).toEqual(21312);
  });

  it("should dispatch 'SortTrainees' and update store", () => {
    store.dispatch(
      new SortTrainees(DEFAULT_SORT.active, DEFAULT_SORT.direction)
    );
    const sort = store.selectSnapshot(TraineesState.sort);
    expect(sort).toEqual(DEFAULT_SORT);
  });

  it("should dispatch 'PaginateTrainees' and update store", () => {
    store.dispatch(new PaginateTrainees(34));
    const pageIndex = store.selectSnapshot(TraineesState.pageIndex);
    expect(pageIndex).toEqual(34);
  });

  it("should dispatch 'ResetTraineesPaginator' and update store", () => {
    store.dispatch(new ResetTraineesPaginator());
    const pageIndex = store.selectSnapshot(TraineesState.pageIndex);
    expect(pageIndex).toEqual(0);
  });

  it("should dispatch 'SearchTrainees' and update store", () => {
    store.dispatch(new SearchTrainees("smith"));
    const searchQuery = store.selectSnapshot(TraineesState.searchQuery);
    expect(searchQuery).toEqual("smith");
  });

  it("should dispatch 'ClearTraineesSearch' and update store", () => {
    store.dispatch(new ClearTraineesSearch());
    const searchQuery = store.selectSnapshot(TraineesState.searchQuery);
    expect(searchQuery).toBeNull();
  });

  it("should dispatch 'UnderNoticeFilter' and update store", () => {
    store.dispatch(new UnderNoticeFilter());
    const underNotice = store.selectSnapshot(TraineesState.underNotice);
    expect(underNotice).toBeTruthy();
  });

  it("should dispatch 'AllDoctorsFilter' and update store", () => {
    store.dispatch(new AllDoctorsFilter());
    const underNotice = store.selectSnapshot(TraineesState.underNotice);
    expect(underNotice).toBeFalsy();
  });
});
