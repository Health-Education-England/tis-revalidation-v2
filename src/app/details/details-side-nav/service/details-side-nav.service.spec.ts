import { TestBed } from "@angular/core/testing";

import { DetailsSideNavService } from "./details-side-nav.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("DetailsSideNavService", () => {
  let service: DetailsSideNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(DetailsSideNavService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
