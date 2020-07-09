import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { UploadService } from "./upload.service";

describe("UploadService", () => {
  let service: UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UploadService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
