import { HttpParams } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { BehaviorSubject, Observable, of } from "rxjs";
import { RecommendationStatus } from "../../recommendation/recommendation-history.interface";
import {
  Filter,
  ResetPaginator,
  Search
} from "../../shared/records/state/records.actions";
import { RecommendationsState } from "../state/recommendations.state";
import {
  IGetRecommendationsResponse,
  RecommendationsFilterType
} from "../recommendations.interfaces";
import { RecommendationsService } from "./recommendations.service";

export const mockRecommendationsResponse: IGetRecommendationsResponse = {
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
      doctorStatus: RecommendationStatus.SUBMITTED_TO_GMC,
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
      doctorStatus: RecommendationStatus.READY_TO_REVIEW,
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

export class MockRecommendationsService {
  public resetSearchForm$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public updateRecommendationsRoute(): Observable<any> {
    return of(mockRecommendationsResponse);
  }

  public generateParams(): any {
    return of({});
  }
}

describe("RecommendationsService", () => {
  let recommendationsService: RecommendationsService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([RecommendationsState])
      ],
      providers: [RecommendationsService]
    });
    recommendationsService = TestBed.inject(RecommendationsService);
    store = TestBed.inject(Store);
  });

  it("should be created", () => {
    expect(recommendationsService).toBeTruthy();
  });

  it("`generateParams()` should generate and return HttpParams", () => {
    store.dispatch(new ResetPaginator());
    store.dispatch(new Filter(RecommendationsFilterType.UNDER_NOTICE));

    const params: HttpParams = recommendationsService.generateParams();

    expect(params instanceof HttpParams).toBeTruthy();
  });

  it("`generateParams()` should include search query if its set on store", () => {
    store.dispatch(new Search("lisa"));
    store.dispatch(new ResetPaginator());
    store.dispatch(new Filter(RecommendationsFilterType.UNDER_NOTICE));

    const params: HttpParams = recommendationsService.generateParams();

    expect(params.get("searchQuery")).toEqual("lisa");
  });
});
