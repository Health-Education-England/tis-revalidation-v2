import { TestBed, async, fakeAsync } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RevalidationHistoryState } from "./revalidation-history.state";
import { RevalidationHistoryAction } from "./revalidation-history.actions";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { RevalidationHistoryRespone2 } from "../mock-data/trainee-spec-data";
import { ErrorHandler } from "@angular/core";
import { IRevalidationHistory } from "../revalidation-history.interface";
import { environment } from "@environment";

describe("RevalidationHistory actions", () => {
  let store: Store;
  let httpMock: HttpTestingController;
  const errorHandlerSpy = () =>
    jasmine.createSpyObj("ErrorHandler", {
      handleError: undefined
    });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([RevalidationHistoryState]),
        HttpClientTestingModule
      ],
      providers: [{ provide: ErrorHandler, useFactory: errorHandlerSpy }]
    }).compileComponents();
    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it("should create an action RevalidationHistoryAction to get reval history", () => {
    const gmcId = 1234;

    store.dispatch(new RevalidationHistoryAction(gmcId));

    const req = httpMock.expectOne(
      `${environment.appUrls.getRecommendation}?id=${gmcId}`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(RevalidationHistoryRespone2);

    const item: IRevalidationHistory = store.selectSnapshot(
      (state) => state.revalidationHistory.item
    );

    expect(item).toEqual(RevalidationHistoryRespone2);
  });

  it("should throw an error is id is not a number", fakeAsync(() => {
    const gmcId = Number("test");
    const errorHandler = TestBed.inject(ErrorHandler);

    store.dispatch(new RevalidationHistoryAction(gmcId));

    expect(errorHandler.handleError).toHaveBeenCalledWith(
      new Error(`gmcNo ${gmcId} must be of type number`)
    );
  }));

  afterEach(() => {
    httpMock.verify();
  });
});
