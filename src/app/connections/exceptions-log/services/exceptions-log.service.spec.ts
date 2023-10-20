import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { ExceptionsLogService } from "./exceptions-log.service";
import { mockExceptions } from "../mock-data/exceptions-log-spec-data";

describe("ExceptionsLogService", () => {
  let service: ExceptionsLogService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ExceptionsLogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get exception log when 'getExceptions' method is called", () => {
    service.getExceptions().subscribe((exceptions) => {
      expect(exceptions).toBeTruthy();
      expect(exceptions).toEqual(mockExceptions);
    });

    const mockHttp = httpMock.expectOne({
      url: "api/connection/exceptionLog/today?admin="
    });
    const httpRequest = mockHttp.request;
    expect(httpRequest.method).toEqual("GET");
    mockHttp.flush(mockExceptions);
  });
});
