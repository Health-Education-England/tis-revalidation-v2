import { TestBed, fakeAsync, waitForAsync } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RecommendationHistoryState } from "./recommendation-history.state";
import { Get as RecommendationHistoryAction } from "./recommendation-history.actions";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { RecommendationHistoryRespone2 } from "../mock-data/recommendation-spec-data";
import { ErrorHandler } from "@angular/core";
import { IRecommendationHistory } from "../recommendation-history.interface";
import { environment } from "@environment";
import { MaterialModule } from "src/app/shared/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";

describe("RecommendationHistory actions", () => {
  let store: Store;
  let httpMock: HttpTestingController;
  const errorHandlerSpy = () =>
    jasmine.createSpyObj("ErrorHandler", {
      handleError: undefined
    });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NgxsModule.forRoot([RecommendationHistoryState]),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [{ provide: ErrorHandler, useFactory: errorHandlerSpy }]
    }).compileComponents();
    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it("should create an action RecommendationHistoryAction to get reval history", () => {
    const gmcNumber = 1234;

    store.dispatch(new RecommendationHistoryAction(gmcNumber));

    const req = httpMock.expectOne(
      `${environment.appUrls.getRecommendation}/${gmcNumber}`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(RecommendationHistoryRespone2);

    const item: IRecommendationHistory = store.selectSnapshot(
      (state) => state.recommendationHistory.item
    );

    expect(item).toEqual(RecommendationHistoryRespone2);
  });

  it("should throw an error is id is not a number", fakeAsync(() => {
    const gmcNumber = Number("test");
    const errorHandler = TestBed.inject(ErrorHandler);

    store.dispatch(new RecommendationHistoryAction(gmcNumber));

    expect(errorHandler.handleError).toHaveBeenCalledWith(
      new Error(`gmcNumber ${gmcNumber} must be of type number`)
    );
  }));

  afterEach(() => {
    httpMock.verify();
  });
});
