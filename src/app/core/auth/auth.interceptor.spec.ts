import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../shared/material/material.module";
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from "@angular/common/http/testing";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { AuthService } from "./auth.service";
import { AuthInterceptor } from "./auth.interceptor";
import { of } from "rxjs";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ConnectionService } from "src/app/connection/services/connection.service";
import { environment } from "@environment";

describe("AuthInterceptor", () => {
  let authService: AuthService;
  let connectionService: ConnectionService;
  let httpMock: HttpTestingController;
  let req: TestRequest;
  const token = "SDcvxcvxDdsdsLJX343SDSDdssdsds";

  const mockCognitoUserSession: CognitoUserSession = {
    getIdToken: () => ({
      payload: { given_name: "Name", family_name: "FName" },
      getJwtToken: () => token,
      getIssuedAt: () => null,
      getExpiration: () => null,
      decodePayload: () => null
    }),
    getAccessToken: () => null,
    getRefreshToken: () => null,
    isValid: () => true
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
      of(mockCognitoUserSession)
    );

    connectionService.getConnectionHistory(gmcNumber).subscribe();

    req = httpMock.expectOne(
      `${environment.appUrls.getConnections}/${gmcNumber}`
    );
    expect(req.request.headers.has("Authorization")).toBe(true);
  });
});
