import { HttpParams } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { BehaviorSubject, Observable, of } from "rxjs";
import { RecordsService } from "../../shared/records/services/records.service";
import { Filter, ResetPaginator, Search } from "../state/trainees.actions";
import { TraineesState, TraineesStateModel } from "../state/trainees.state";
import {
  IGetTraineesResponse,
  TraineesFilterType
} from "../trainees.interfaces";
import { TraineesService } from "./trainees.service";

export const mockTraineesResponse: IGetTraineesResponse = {
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

export class MockTraineeService {
  public resetSearchForm$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public updateTraineesRoute(): Observable<any> {
    return of(mockTraineesResponse);
  }

  public generateParams(): any {
    return of({});
  }
}

describe("TraineeService", () => {
  let traineeService: TraineesService;
  let recordsService: RecordsService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([TraineesState])
      ],
      providers: [TraineesService]
    });
    traineeService = TestBed.inject(TraineesService);
    recordsService = TestBed.inject(RecordsService);
    store = TestBed.inject(Store);
  });

  it("should be created", () => {
    expect(traineeService).toBeTruthy();
  });

  it("`generateParams()` should generate and return HttpParams", () => {
    store.dispatch(new ResetPaginator());
    store.dispatch(new Filter(TraineesFilterType.UNDER_NOTICE));

    const params: HttpParams = traineeService.generateParams();

    expect(params instanceof HttpParams).toBeTruthy();
  });

  it("`generateParams()` should include search query if its set on store", () => {
    store.dispatch(new Search("lisa"));
    store.dispatch(new ResetPaginator());
    store.dispatch(new Filter(TraineesFilterType.UNDER_NOTICE));

    const params: HttpParams = traineeService.generateParams();

    expect(params.get("searchQuery")).toEqual("lisa");
  });

  it("`updateTraineesRoute()` should invoke `recordsService.updateRoute()`", () => {
    spyOn(recordsService, "updateRoute");

    const snapshot: TraineesStateModel = store.snapshot().trainees;
    traineeService.updateTraineesRoute();

    expect(recordsService.updateRoute).toHaveBeenCalledWith(
      snapshot,
      "trainees"
    );
  });
});
