import { TestBed } from "@angular/core/testing";
import { environment } from "@environment";
import { TraineesService } from "./trainees.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { traineesResponse1 } from "./spec-data/spec.trainees";
import { HttpParams } from "@angular/common/http";

describe("TraineesService", () => {
  let service: TraineesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TraineesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return mock trainees", () => {
    service
      .getTrainees(new HttpParams().set("pageNumber", "0"))
      .subscribe((res) => {
        expect(res).toEqual(traineesResponse1);
      });

    const reqMock = httpMock.expectOne(
      (req) =>
        req.method === "GET" && req.url === `${environment.appUrls.getTrainees}`
    );
    expect(reqMock.request.method).toBe("GET");
    expect(reqMock.request.params.toString()).toBe("pageNumber=0");
    reqMock.flush(traineesResponse1);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
