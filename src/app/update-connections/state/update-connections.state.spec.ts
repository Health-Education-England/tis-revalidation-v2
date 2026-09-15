import { TestBed, fakeAsync, waitForAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule, Store } from "@ngxs/store";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { MaterialModule } from "../../shared/material/material.module";
import { ErrorHandler } from "@angular/core";
import { UpdateConnectionsState } from "./update-connections.state";
import { UpdateConnectionsService } from "../services/update-connections.service";
import { EnableUpdateConnections } from "./update-connections.actions";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("Update connection actions", () => {
  let store: Store;
  let httpMock: HttpTestingController;

  const errorHandlerSpy = () =>
    jasmine.createSpyObj("ErrorHandler", {
      handleError: undefined
    });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [NgxsModule.forRoot([UpdateConnectionsState]),
        MaterialModule,
        NoopAnimationsModule],
    providers: [
        UpdateConnectionsService,
        { provide: ErrorHandler, useFactory: errorHandlerSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();
    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it("should update enableUpdateConnections when EnableUpdateConnections action called", fakeAsync(() => {
    store.dispatch(new EnableUpdateConnections(true));

    const enableUpdateConnections = store.selectSnapshot(
      (state) => state.updateConnections.enableUpdateConnections
    );

    expect(enableUpdateConnections).toBeTruthy();
  }));
});
