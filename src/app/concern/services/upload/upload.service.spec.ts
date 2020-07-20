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
  const bucketName: string = environment.awsConfig.bucketName;
  const queryParams = `?bucketName=${bucketName}&key=${mockKey}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UploadService);
    http = TestBed.inject(HttpTestingController);
    params = service.createRequestParams(mockKey);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("`createDownloadFileParams()` should generate and return HttpParams", () => {
    expect(params instanceof HttpParams).toBeTruthy();
    expect(params.get("key")).toEqual(mockKey);
  });

  it("`downloadFile()` should call api", () => {
    service.downloadFile(service.createRequestParams(mockKey)).subscribe();

    const endPoint: string = environment.appUrls.downloadFile;
    const mockHttp = http.expectOne(`${endPoint}${queryParams}`);

    expect(mockHttp.request.method).toBe("GET");
    http.verify();
  });

  it("`deleteFile()` should call api", () => {
    service.deleteFile(service.createRequestParams(mockKey)).subscribe();

    const endPoint: string = environment.appUrls.deleteFile;
    const mockHttp = http.expectOne(`${endPoint}${queryParams}`);

    expect(mockHttp.request.method).toBe("DELETE");
    http.verify();
  });
});
