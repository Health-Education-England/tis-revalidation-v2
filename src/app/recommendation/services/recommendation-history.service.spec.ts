import { TestBed } from "@angular/core/testing";

import { RecommendationHistoryService } from "./recommendation-history.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("RecommendationHistoryService", () => {
  let service: RecommendationHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(RecommendationHistoryService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
