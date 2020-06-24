import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ConcernsService } from "./concerns.service";

describe("ConcernsService", () => {
  let concernsService: ConcernsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    concernsService = TestBed.inject(ConcernsService);
  });

  it("should be created", () => {
    expect(concernsService).toBeTruthy();
  });
});
