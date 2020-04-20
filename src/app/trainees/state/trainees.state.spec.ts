import { HttpParams } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { DEFAULT_SORT } from "../../core/trainee/constants";
import { IGetTraineesResponse } from "../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../core/trainee/trainee.service";
import { MaterialModule } from "../../shared/material/material.module";
import {
  ClearTraineesSearch,
  GetTrainees,
  PaginateTrainees,
  ResetTraineesPaginator,
  SearchTrainees,
  SortTrainees
} from "./trainees.actions";
import { TraineesState } from "./trainees.state";

export class MockTraineeService {
  public getTrainees(): Observable<any> {
    return of({});
  }

  public updateTraineesRoute(): Observable<any> {
    return of({});
  }
}

describe("Trainees state", () => {
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
    countTotal: 21312,
    countUnderNotice: 212,
    totalResults: 77,
    totalPages: 100
  };

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
    const traineeListState = store.selectSnapshot(TraineesState);
    expect(traineeListState).toBeTruthy();
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

  it("should dispatch 'SearchTrainees, GetTrainees' and invoke api with searchQuery", () => {
    spyOn(traineeService, "getTrainees").and.callThrough();
    let mockParams = new HttpParams().set("pageNumber", "0");

    store.dispatch(new SearchTrainees("lisa"));
    store.dispatch(new GetTrainees());

    mockParams = mockParams.append("searchQuery", "lisa");
    expect(traineeService.getTrainees).toHaveBeenCalledWith(mockParams);
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
});
