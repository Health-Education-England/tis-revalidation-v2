import { TestBed, fakeAsync, waitForAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { MaterialModule } from "../../shared/material/material.module";
import { IGetConcernResponse } from "../concern.interfaces";
import { UploadService } from "../services/upload/upload.service";
import { ConcernState } from "./concern.state";
import { Get, Upload, UploadSuccess } from "./concern.actions";
import { ConcernService } from "../services/concern/concern.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { environment } from "@environment";
import { ConcernHistoryResponse2 } from "src/app/recommendation/mock-data/recommendation-spec-data";

import { ErrorHandler } from "@angular/core";
import { SnackBarService } from "src/app/shared/services/snack-bar/snack-bar.service";

describe("Concern actions", () => {
  let store: Store;
  let httpMock: HttpTestingController;
  let uploadService: UploadService;
  let snackBarService: SnackBarService;

  const errorHandlerSpy = () =>
    jasmine.createSpyObj("ErrorHandler", {
      handleError: undefined
    });

  const mockFile = new File([""], "mockfile.txt", { type: "text/plain" });

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NgxsModule.forRoot([ConcernState]),
          MaterialModule,
          NoopAnimationsModule,
          HttpClientTestingModule
        ],
        providers: [
          ConcernService,
          { provide: ErrorHandler, useFactory: errorHandlerSpy }
        ]
      }).compileComponents();
      store = TestBed.inject(Store);
      uploadService = TestBed.inject(UploadService);
      httpMock = TestBed.inject(HttpTestingController);
      snackBarService = TestBed.inject(SnackBarService);
    })
  );

  it("should create a get concerns action", fakeAsync(() => {
    const gmcNumber = 1234;

    store.dispatch(new Get(gmcNumber));

    const req = httpMock.expectOne(
      `${environment.appUrls.getConcern}/${gmcNumber}`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(ConcernHistoryResponse2);

    const history: IGetConcernResponse = store.selectSnapshot(
      (state) => state.concern.history
    );

    expect(history).toEqual(ConcernHistoryResponse2.concerns);
    httpMock.verify();
  }));

  it("should throw an error if get id is not a number", fakeAsync(() => {
    const gmcNumber = Number("test");
    const errorHandler = TestBed.inject(ErrorHandler);

    store.dispatch(new Get(gmcNumber));

    expect(errorHandler.handleError).toHaveBeenCalledWith(
      new Error(`gmcNumber ${gmcNumber} must be of type number`)
    );
    httpMock.verify();
  }));

  it("on 'Upload' event `uploadFileInProgress` should be truthy", () => {
    store.dispatch(new Upload(12132312, "xxxxxx-yyyyy-zzzzz", [mockFile]));
    const uploadFileInProgress = store.selectSnapshot(ConcernState)
      .uploadFileInProgress;
    expect(uploadFileInProgress).toBeTrue();
  });

  it("on 'Upload' event `uploadService.upload` is invoked", async () => {
    spyOn(uploadService, "upload").and.returnValue(of({}));
    await store
      .dispatch(new Upload(12132312, "xxxxxx-yyyyy-zzzzz", [mockFile]))
      .toPromise();
    expect(uploadService.upload).toHaveBeenCalled();
  });

  it("on 'UploadSuccess' event `ListFiles` is event is dispatched", async () => {
    spyOn(snackBarService, "openSnackBar");
    spyOn(uploadService, "createListFilesParams").and.callThrough();
    const gmcId = 12132312;
    const concId = "xxxxxx-yyyyy-zzzzz";
    await store.dispatch(new UploadSuccess(gmcId, concId)).toPromise();
    expect(snackBarService.openSnackBar).toHaveBeenCalled();
    expect(uploadService.createListFilesParams).toHaveBeenCalledWith(
      gmcId,
      concId
    );
  });
});
