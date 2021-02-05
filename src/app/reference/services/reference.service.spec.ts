import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "@environment";
import { ReferenceService } from "./reference.service";

describe("ReferenceService", () => {
  let service: ReferenceService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReferenceService);
    http = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call get dbcs api", () => {
    const endPoint = `${environment.appUrls.getDbcs}`;

    service.getDbcs().subscribe();

    const mockHttp = http.expectOne(endPoint);
    expect(mockHttp.request.method).toBe("GET");

    http.verify();
  });
});
