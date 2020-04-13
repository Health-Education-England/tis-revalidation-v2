import { TestBed } from "@angular/core/testing";
import { LoadingSpinnerService } from "./loading-spinner.service";
import { MaterialModule } from "../shared/material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Overlay } from "@angular/cdk/overlay";

describe("LoadingSpinnerService", () => {
  let service: LoadingSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule]
    });
    service = TestBed.inject(LoadingSpinnerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should be show mat spinner", () => {
    service.show();
    expect(service.spinnerTopRef.hasAttached()).toBeTruthy();
  });

  it("should be hide mat spinner", () => {
    service.hide();
    expect(service.spinnerTopRef.hasAttached()).toBeFalsy();
  });

  it("should be reset mat spinner", () => {
    service.reset();
    expect(service.spinnerTopRef.hasAttached()).toBeFalsy();
  });
});
