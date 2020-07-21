import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../shared/material/material.module";
import { AuthInterceptor } from "./auth.interceptor";

describe("AuthInterceptor", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthInterceptor],
      imports: [MaterialModule]
    })
  );

  it("should be created", () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
