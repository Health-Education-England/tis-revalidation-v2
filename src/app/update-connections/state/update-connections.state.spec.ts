import { TestBed, async, fakeAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule, Store } from "@ngxs/store";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { MaterialModule } from "../../shared/material/material.module";
import { ErrorHandler } from "@angular/core";
import { UpdateConnectionsState } from "./update-connections.state";
import { UpdateConnectionsService } from "../services/update-connections.service";
import { environment } from "@environment";
import { mockDbcs } from "src/app/reference/mock-data/reference-spec.data";
import { EnableUpdateConnections, Get } from "./update-connections.actions";

describe("Update connection actions", () => {
  let store: Store;
  let httpMock: HttpTestingController;

  const errorHandlerSpy = () =>
    jasmine.createSpyObj("ErrorHandler", {
      handleError: undefined
    });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UpdateConnectionsState]),
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        UpdateConnectionsService,
        { provide: ErrorHandler, useFactory: errorHandlerSpy }
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it("should create a get dbcs action", fakeAsync(() => {
    store.dispatch(new Get());

    const req = httpMock.expectOne(`${environment.appUrls.getDbcs}`);
    expect(req.request.method).toEqual("GET");
    req.flush(mockDbcs);

    const dbcs = store.selectSnapshot((state) => state.updateConnections.dbcs);

    expect(dbcs).toEqual(mockDbcs);

    httpMock.verify();
  }));

  it("should update enableUpdateConnections when EnableUpdateConnections action called", fakeAsync(() => {
    store.dispatch(new EnableUpdateConnections(true));

    const enableUpdateConnections = store.selectSnapshot(
      (state) => state.updateConnections.enableUpdateConnections
    );

    expect(enableUpdateConnections).toBeTruthy();
  }));
});
