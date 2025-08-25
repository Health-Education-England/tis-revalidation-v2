import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../shared/material/material.module";
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { AuthInterceptor } from "./auth.interceptor";
import { of } from "rxjs";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ConnectionService } from "src/app/connection/services/connection.service";
import { environment } from "@environment";
import { AuthSession } from "aws-amplify/auth";

describe("AuthInterceptor", () => {
  let authService: AuthService;
  let connectionService: ConnectionService;
  let httpMock: HttpTestingController;
  let req: TestRequest;
  const token = "SDcvxcvxDdsdsLJX343SDSDdssdsds";

  const mockAuthSession: AuthSession = {
    tokens: {
      idToken: { toString: () => token, payload: {} },
      accessToken: { toString: () => token, payload: {} }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        ConnectionService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ],
      imports: [MaterialModule, HttpClientTestingModule]
    });
    connectionService = TestBed.inject(ConnectionService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should add jwt token to the request header", () => {
    const gmcNumber = 65477888;
    spyOn(authService, "currentSession").and.callFake(() =>
      of(mockAuthSession)
    );

    connectionService.getConnectionHistory(gmcNumber).subscribe();

    req = httpMock.expectOne(
      `${environment.appUrls.getConnections}/${gmcNumber}`
    );
    expect(req.request.headers.has("Authorization")).toBe(true);
  });
});
