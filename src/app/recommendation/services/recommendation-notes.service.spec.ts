import { TestBed } from "@angular/core/testing";

import { RecommendationNotesService } from "./recommendation-notes.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RecommendationNotesService", () => {
  let service: RecommendationNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RecommendationNotesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
