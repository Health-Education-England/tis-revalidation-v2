import { TestBed } from "@angular/core/testing";

import { RecommendationNotesService } from "./recommendation-notes.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("RecommendationNotesService", () => {
  let service: RecommendationNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(RecommendationNotesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
