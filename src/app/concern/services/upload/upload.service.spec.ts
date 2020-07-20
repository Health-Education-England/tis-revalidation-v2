import { HttpParams } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "@environment";
import { UploadService } from "./upload.service";

describe("UploadService", () => {
  let service: UploadService;
  let http: HttpTestingController;
  let params: HttpParams;
  const mockKey = "119389/8119389/mockfile.txt";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UploadService);
    http = TestBed.inject(HttpTestingController);
    params = service.createDownloadFileParams(mockKey);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("`createDownloadFileParams()` should generate and return HttpParams", () => {
    expect(params instanceof HttpParams).toBeTruthy();
    expect(params.get("key")).toEqual(mockKey);
  });

  it("`downloadFile()` should call api", () => {
    const endPoint = `${environment.appUrls.downloadFile}`;
    service.downloadFile(service.createDownloadFileParams(mockKey)).subscribe();

    const mockHttp = http.expectOne(
      `${endPoint}?bucketName=tis-test-bucket-2020&key=${mockKey}`
    );
    expect(mockHttp.request.method).toBe("GET");

    http.verify();
  });
});
