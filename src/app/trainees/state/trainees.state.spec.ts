import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { Params, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { DEFAULT_ROUTE_SORT } from "../../core/trainee/constants";
import { IGetTraineesResponse } from "../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../core/trainee/trainee.service";
import { MaterialModule } from "../../shared/material/material.module";
import { TraineesState } from "./trainees.state";
import {
  GetTrainees,
  PaginateTrainees,
  SortTrainees,
  UpdateTraineesRoute
} from "./trainees.actions";

describe("Trainees actions", () => {
  let store: Store;
  let traineeService: TraineeService;
  let router: Router;
  const mockResponse: IGetTraineesResponse = {
    traineeInfo: [
      {
        dateAdded: "2015-05-14",
        doctorFirstName: "Bobby",
        doctorLastName: "Brown",
        gmcReferenceNumber: "7777777",
        sanction: "No",
        submissionDate: "2018-05-14",
        underNotice: "No",
        admin: "",
        cctDate: "2015-09-08",
        doctorStatus: "",
        lastUpdatedDate: "2015-09-08",
        programmeMembershipType: "",
        programmeName: ""
      },
      {
        dateAdded: "2017-09-01",
        doctorFirstName: "Kelly",
        doctorLastName: "Green",
        gmcReferenceNumber: "1111",
        sanction: "No",
        submissionDate: "2019-01-12",
        underNotice: "No",
        admin: "",
        cctDate: "2015-09-08",
        doctorStatus: "",
        lastUpdatedDate: "2015-09-08",
        programmeMembershipType: "",
        programmeName: ""
      }
    ],
    countTotal: 21312
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule
      ],
      providers: [TraineeService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    traineeService = TestBed.inject(TraineeService);
  }));

  it("should select 'TraineesState'", () => {
    const traineeListState = store.selectSnapshot(TraineesState);
    expect(traineeListState).toBeTruthy();
  });

  it("should dispatch 'GetTrainees' and set 'loading' slice'", () => {
    spyOn(traineeService, "getTrainees").and.callThrough();
    store.dispatch(new GetTrainees());
    const loading = store.selectSnapshot(TraineesState.loading);
    expect(loading).toBeTruthy();
  });

  it("should dispatch 'GetTrainees' and make api call", () => {
    spyOn(traineeService, "getTrainees").and.callThrough();
    store.dispatch(new GetTrainees());
    expect(traineeService.getTrainees).toHaveBeenCalled();
  });

  it("should dispatch 'GetTrainees' and select 'trainees' slice", () => {
    spyOn(traineeService, "getTrainees").and.returnValue(of(mockResponse));

    store.dispatch(new GetTrainees());
    const trainees = store.selectSnapshot(TraineesState.trainees);

    expect(trainees.length).toEqual(2);
    expect(trainees[0].doctorFirstName).toEqual("Bobby");
  });

  it("should dispatch 'GetTrainees' and select 'countTotal' slice", () => {
    spyOn(traineeService, "getTrainees").and.returnValue(of(mockResponse));

    store.dispatch(new GetTrainees());
    const count = store.selectSnapshot(TraineesState.countTotal);

    expect(count).toEqual(21312);
  });

  it("should dispatch 'SortTrainees' and update store", () => {
    store.dispatch(
      new SortTrainees(DEFAULT_ROUTE_SORT.active, DEFAULT_ROUTE_SORT.direction)
    );
    const sort = store.selectSnapshot(TraineesState.sort);
    expect(sort).toEqual(DEFAULT_ROUTE_SORT);
  });

  it("should dispatch 'PaginateTrainees' and update store", () => {
    store.dispatch(new PaginateTrainees(34));
    const pageIndex = store.selectSnapshot(TraineesState.pageIndex);
    expect(pageIndex).toEqual(34);
  });

  it("should dispatch 'UpdateTraineesRoute' and navigate to trainees route", () => {
    spyOn(router, "navigate");
    const mockQueryParams: Params = {
      active: "doctorFirstName",
      direction: "asc",
      pageIndex: 6
    };

    store.dispatch([
      new SortTrainees(mockQueryParams.active, mockQueryParams.direction),
      new PaginateTrainees(mockQueryParams.pageIndex),
      new UpdateTraineesRoute()
    ]);

    expect(router.navigate).toHaveBeenCalledWith(["/trainees"], {
      queryParams: mockQueryParams
    });
  });
});
