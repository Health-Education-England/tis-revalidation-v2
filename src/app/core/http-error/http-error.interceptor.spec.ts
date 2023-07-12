import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../shared/material/material.module";
import { HttpErrorInterceptor } from "./http-error.interceptor";
import { RouterTestingModule } from "@angular/router/testing";
describe("HttpErrorInterceptor", () => {
  let interceptor: HttpErrorInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule],
      providers: [HttpErrorInterceptor]
    });
    interceptor = TestBed.inject(HttpErrorInterceptor);
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });
});
