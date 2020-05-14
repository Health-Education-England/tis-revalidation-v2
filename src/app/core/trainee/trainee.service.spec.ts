import { HttpParams } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "@environment";
import { NgxsModule, Store } from "@ngxs/store";
import { BehaviorSubject, Observable, of } from "rxjs";
import {
  ResetTraineesPaginator,
  SearchTrainees,
  UnderNoticeFilter
} from "../../trainees/state/trainees.actions";
import {
  TraineesState,
  TraineesStateModel
} from "../../trainees/state/trainees.state";
import { IGetTraineesResponse } from "./trainee.interfaces";
import { TraineeService } from "./trainee.service";

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

export class MockTraineeService {
  public resetSearchForm$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public getTrainees(): Observable<any> {
    return of(mockResponse);
  }

  public updateTraineesRoute(): Observable<any> {
    return of(mockResponse);
  }

  public generateParams(): any {
    return of({});
  }
}

describe("TraineeService", () => {
  let service: TraineeService;
  let http: HttpTestingController;
  let router: Router;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([TraineesState])
      ],
      providers: [TraineeService]
    });
    service = TestBed.inject(TraineeService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("`getTrainees()` should call api", () => {
    service.getTrainees().subscribe();

    const mockHttp = http.expectOne(`${environment.appUrls.getTrainees}`);
    expect(mockHttp.request.method).toBe("GET");

    http.verify();
  });

  it("`generateParams()` should generate and return HttpParams", () => {
    store.dispatch(new ResetTraineesPaginator());
    store.dispatch(new UnderNoticeFilter());

    const params: HttpParams = service.generateParams();

    expect(params instanceof HttpParams).toBeTruthy();
  });

  it("`generateParams()` should include search query if its set on store", () => {
    store.dispatch(new SearchTrainees("lisa"));
    store.dispatch(new ResetTraineesPaginator());
    store.dispatch(new UnderNoticeFilter());

    const params: HttpParams = service.generateParams();

    expect(params.get("searchQuery")).toEqual("lisa");
  });

  it("`updateTraineesRoute()` should navigate to `/trainees`", () => {
    spyOn(router, "navigate");

    const snapshot: TraineesStateModel = store.snapshot().trainees;
    service.updateTraineesRoute();

    expect(router.navigate).toHaveBeenCalledWith(["/trainees"], {
      queryParams: {
        active: snapshot.sort.active,
        direction: snapshot.sort.direction,
        pageIndex: snapshot.pageIndex,
        filter: snapshot.filter,
        ...(snapshot.searchQuery && { searchQuery: snapshot.searchQuery })
      }
    });
  });
});
