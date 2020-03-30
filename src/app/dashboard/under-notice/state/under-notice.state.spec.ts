import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, async } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { IUnderNoticeResponse } from "../../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../../core/trainee/trainee.service";
import { UnderNoticeState } from "./under-notice.state";
import { GetUnderNoticeTrainees } from "./under-notice.actions";

describe("UnderNotice actions", () => {
  let store: Store;
  let traineeService: TraineeService;
  const mockResponse: IUnderNoticeResponse = {
    doctorsForDB: [
      {
        dateAdded: "2015-05-14",
        doctorFirstName: "Bobby",
        doctorLastName: "Brown",
        gmcReferenceNumber: "7777777",
        sanction: "No",
        submissionDate: "2018-05-14",
        underNotice: "No"
      },
      {
        dateAdded: "2017-09-01",
        doctorFirstName: "Kelly",
        doctorLastName: "Green",
        gmcReferenceNumber: "1111",
        sanction: "No",
        submissionDate: "2019-01-12",
        underNotice: "No"
      }
    ],
    count: 21312
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UnderNoticeState]),
        HttpClientTestingModule
      ],
      providers: [TraineeService]
    }).compileComponents();
    store = TestBed.inject(Store);
    traineeService = TestBed.inject(TraineeService);
  }));

  it("should select 'UnderNoticeState'", () => {
    const underNoticeState = store.selectSnapshot(UnderNoticeState);
    expect(underNoticeState).toBeTruthy();
  });

  it("should select default 'loading' state'", () => {
    const loading = store.selectSnapshot(UnderNoticeState.loading);
    expect(loading).toBeTruthy();
  });

  it("should dispatch 'GetUnderNoticeTrainees' and make api call", () => {
    spyOn(traineeService, "getUnderNoticeTrainees").and.callThrough();
    store.dispatch(new GetUnderNoticeTrainees());
    expect(traineeService.getUnderNoticeTrainees).toHaveBeenCalled();
  });

  it("should dispatch 'GetUnderNoticeTrainees' and select 'underNoticeTrainees'", () => {
    spyOn(traineeService, "getUnderNoticeTrainees").and.returnValue(
      of(mockResponse)
    );

    store.dispatch(new GetUnderNoticeTrainees());
    const underNoticeTrainees = store.selectSnapshot(
      UnderNoticeState.underNoticeTrainees
    );

    expect(underNoticeTrainees.length).toEqual(2);
    expect(underNoticeTrainees[0].doctorFirstName).toEqual("Bobby");
  });
});
