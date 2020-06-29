import { TestBed, async, fakeAsync } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { ConcernState } from "./concern.state";
import { Get } from "./concern.actions";
import { ConcernService } from "../service/concern.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { environment } from "@environment";
import { ConcernHistoryResponse2 } from "src/app/recommendation/mock-data/recommendation-spec-data";
import { IConcernHistory } from "../concern-history.interface";
import { ErrorHandler } from "@angular/core";

describe("Concern actions", () => {
  let store: Store;
  let httpMock: HttpTestingController;
  const errorHandlerSpy = () =>
    jasmine.createSpyObj("ErrorHandler", {
      handleError: undefined
    });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ConcernState]), HttpClientTestingModule],
      providers: [
        ConcernService,
        { provide: ErrorHandler, useFactory: errorHandlerSpy }
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it("should create an action and add an item", fakeAsync(() => {
    const gmcNumber = 1234;

    store.dispatch(new Get(gmcNumber));

    const req = httpMock.expectOne(
      `${environment.appUrls.getConcern}/${gmcNumber}`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(ConcernHistoryResponse2);

    const item: IConcernHistory = store.selectSnapshot(
      (state) => state.concern.item
    );

    expect(item).toEqual(ConcernHistoryResponse2);
  }));

  it("should throw an error is id is not a number", fakeAsync(() => {
    const gmcNumber = Number("test");
    const errorHandler = TestBed.inject(ErrorHandler);

    store.dispatch(new Get(gmcNumber));

    expect(errorHandler.handleError).toHaveBeenCalledWith(
      new Error(`gmcNumber ${gmcNumber} must be of type number`)
    );
  }));

  afterEach(() => {
    httpMock.verify();
  });
});
