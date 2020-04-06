import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { DEFAULT_ROUTE_SORT } from "../../core/trainee/constants";
import { IGetTraineesResponse } from "../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../core/trainee/trainee.service";
import { TraineesState } from "./trainees.state";
import { GetTrainees, SortTrainees } from "./trainees.actions";

describe("Trainees actions", () => {
  let store: Store;
  let traineeService: TraineeService;
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
    count: 21312
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TraineesState]), HttpClientTestingModule],
      providers: [TraineeService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    traineeService = TestBed.inject(TraineeService);
  }));

  it("should select 'TraineesState'", () => {
    const traineeListState = store.selectSnapshot(TraineesState);
    expect(traineeListState).toBeTruthy();
  });

  it("should select default 'loading' slice'", () => {
    const loading = store.selectSnapshot(TraineesState.loading);
    expect(loading).toBeTruthy();
  });

  it("should dispatch 'getTrainees' and make api call", () => {
    spyOn(traineeService, "getTrainees").and.callThrough();
    store.dispatch(new GetTrainees());
    expect(traineeService.getTrainees).toHaveBeenCalled();
  });

  it("should dispatch 'getTrainees' and select 'trainees' slice", () => {
    spyOn(traineeService, "getTrainees").and.returnValue(of(mockResponse));

    store.dispatch(new GetTrainees());
    const trainees = store.selectSnapshot(TraineesState.trainees);

    expect(trainees.length).toEqual(2);
    expect(trainees[0].doctorFirstName).toEqual("Bobby");
  });

  it("should dispatch 'getTrainees' and select 'count' slice", () => {
    spyOn(traineeService, "getTrainees").and.returnValue(of(mockResponse));

    store.dispatch(new GetTrainees());
    const count = store.selectSnapshot(TraineesState.count);

    expect(count).toEqual(21312);
  });

  it("should dispatch 'sortTrainees' and update store", () => {
    store.dispatch(
      new SortTrainees(DEFAULT_ROUTE_SORT.active, DEFAULT_ROUTE_SORT.direction)
    );
    const sort = store.selectSnapshot(TraineesState.sort);
    expect(sort).toEqual(DEFAULT_ROUTE_SORT);
  });
});
