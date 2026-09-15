import { TestBed } from "@angular/core/testing";

import { ConcernService } from "./concern.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("ConcernService", () => {
  let service: ConcernService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ConcernService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
