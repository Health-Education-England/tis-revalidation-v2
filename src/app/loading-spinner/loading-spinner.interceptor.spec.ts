import { TestBed } from "@angular/core/testing";

import { LoadingSpinnerInterceptor } from "./loading-spinner.interceptor";
import { MaterialModule } from "../shared/material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("LoadingSpinnerInterceptor", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule],
      providers: [LoadingSpinnerInterceptor]
    })
  );

  it("should be created", () => {
    const interceptor: LoadingSpinnerInterceptor = TestBed.inject(
      LoadingSpinnerInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
