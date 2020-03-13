import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, async } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { ITrainee } from "../../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../../core/trainee/trainee.service";
import { UnderNoticeState } from "./under-notice.state";
import { GetUnderNoticeTrainees } from "./under-notice.actions";

describe("UnderNotice actions", () => {
  let store: Store;
  let traineeService: TraineeService;
  const mockTrainees: ITrainee[] = [
    {
      firstName: "Bobby",
      lastName: "Brown",
      gmcNumber: "7777777",
      programmeMembershipType: "test 1",
      status: "test 1",
      traineeType: "test 1",
      lastUpdated: "2015-05-14"
    },
    {
      firstName: "Eddie",
      lastName: "Silver",
      gmcNumber: "8383834",
      programmeMembershipType: "test 5",
      status: "test 5",
      traineeType: "test 5",
      lastUpdated: "2019-01-12"
    }
  ];

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
      of(mockTrainees)
    );

    store.dispatch(new GetUnderNoticeTrainees());
    const underNoticeTrainees = store.selectSnapshot(
      UnderNoticeState.underNoticeTrainees
    );

    expect(underNoticeTrainees.length).toEqual(2);
    expect(underNoticeTrainees[0].firstName).toEqual("Bobby");
  });
});
