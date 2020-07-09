import { TestBed } from "@angular/core/testing";

import { ConcernService } from "./concern.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ConcernService", () => {
  let service: ConcernService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ConcernService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
