import { TestBed } from "@angular/core/testing";
import { ConnectionService } from "./connection.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { environment } from "@environment";

describe("ConcernService", () => {
  let http: HttpTestingController;
  let service: ConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ConnectionService);
    http = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call get connection details api", () => {
    const gmcNumber = 1234567;
    const endPoint = `${environment.appUrls.getConnections}/${gmcNumber}`;

    service.getConnectionHistory(gmcNumber).subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("GET");

    http.verify();
  });

  it("should call show discrepancy endpoint", () => {
    const discrepancyID = "1234567";
    const endPoint = `${environment.appUrls.showDiscrepancy}/${discrepancyID}`;

    service.showDiscrepancy(discrepancyID).subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("DELETE");

    http.verify();
  });
});
