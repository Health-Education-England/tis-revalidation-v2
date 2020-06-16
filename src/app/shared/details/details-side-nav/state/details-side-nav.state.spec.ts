import { TestBed, async, fakeAsync } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { DetailsSideNavState } from "./details-side-nav.state";
import { Get as DetailsSideNavAction } from "./details-side-nav.actions";
import { environment } from "@environment";
import { RecommendationHistoryRespone2 } from "src/app/recommendation/mock-data/recommendation-spec-data";
import { IRecommendationHistory } from "src/app/recommendation/recommendation-history.interface";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";

describe("DetailsSideNav actions", () => {
  let store: Store;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([DetailsSideNavState])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it("should create an action and add an item", fakeAsync(() => {
    const gmcId = 1234;

    store.dispatch(new DetailsSideNavAction(gmcId));

    const req = httpMock.expectOne(
      `${environment.appUrls.getDetails}/${gmcId}`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(RecommendationHistoryRespone2);

    const item: IRecommendationHistory = store.selectSnapshot(
      (state) => state.traineeDetails.item
    );

    expect(item).toEqual(RecommendationHistoryRespone2);
  }));

  afterEach(() => {
    httpMock.verify();
  });
});
