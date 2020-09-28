import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../shared/material/material.module";
import { AuthInterceptor } from "./auth.interceptor";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("AuthInterceptor", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthInterceptor],
      imports: [MaterialModule, HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
