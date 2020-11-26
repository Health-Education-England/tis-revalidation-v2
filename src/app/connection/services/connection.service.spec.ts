import { TestBed } from "@angular/core/testing";
import { ConnectionService } from "./connection.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { environment } from "@environment";
import { mockConnectionResponse } from "../mock-data/conneciton-details-spec-data";

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
    const endPoint = `${environment.appUrls.getConnections}/${mockConnectionResponse.connection.gmcNumber}`;

    service
      .getConnectionHistory(mockConnectionResponse.connection.gmcNumber)
      .subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("GET");

    http.verify();
  });

  it("should add new connection", () => {
    const endPoint = `${environment.appUrls.getConnections}/add`;

    service.addConnection({}).subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("POST");

    http.verify();
  });

  it("should remove current connection", () => {
    const endPoint = `${environment.appUrls.getConnections}/remove`;

    service.removeConnection({}).subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("POST");

    http.verify();
  });

  it("should throw error when add/remove connection api call fail", () => {
    let response: any;
    let errResponse: any;
    const mockErrorResponse = { status: 400, statusText: "Bad Request" };
    const data = "Invalid request parameters";

    service.removeConnection({}).subscribe(
      (res) => (response = res),
      (err) => (errResponse = err)
    );
    http
      .expectOne(`${environment.appUrls.getConnections}/remove`)
      .flush(data, mockErrorResponse);

    expect(errResponse.error).toBe(data);
  });
});
