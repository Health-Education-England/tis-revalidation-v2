import { TestBed } from "@angular/core/testing";

import { RevalidationHistoryService } from "./revalidation-history.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RevalidationHistoryService", () => {
  let service: RevalidationHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RevalidationHistoryService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
