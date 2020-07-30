import { TestBed } from "@angular/core/testing";

import { DetailsSideNavService } from "./details-side-nav.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("DetailsSideNavService", () => {
  let service: DetailsSideNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DetailsSideNavService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
