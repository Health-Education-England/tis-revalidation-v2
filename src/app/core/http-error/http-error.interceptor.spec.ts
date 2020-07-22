import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../shared/material/material.module";
import { HttpErrorInterceptor } from "./http-error.interceptor";

describe("HttpErrorInterceptor", () => {
  let interceptor: HttpErrorInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [HttpErrorInterceptor]
    });
    interceptor = TestBed.inject(HttpErrorInterceptor);
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });
});
