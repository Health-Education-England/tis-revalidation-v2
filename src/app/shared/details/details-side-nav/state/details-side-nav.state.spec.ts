import { TestBed, async, fakeAsync } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { IDetailsSideNav } from "../details-side-nav.interfaces";
import { DetailsSideNavState } from "./details-side-nav.state";
import { Get as DetailsSideNavAction } from "./details-side-nav.actions";
import { environment } from "@environment";
import { detailsSideNavResponse } from "src/app/recommendation/mock-data/recommendation-spec-data";
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
    const gmcNumber = 1234;

    store.dispatch(new DetailsSideNavAction(gmcNumber));

    const req = httpMock.expectOne(
      `${environment.appUrls.getDetails}/${gmcNumber}`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(detailsSideNavResponse);

    const item: IDetailsSideNav = store.selectSnapshot(
      (state) => state.traineeDetails.item
    );

    expect(item).toEqual(detailsSideNavResponse);
  }));

  afterEach(() => {
    httpMock.verify();
  });
});
