import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";

describe("AuthService", () => {
  let service: AuthService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
