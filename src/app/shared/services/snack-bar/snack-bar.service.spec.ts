import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../material/material.module";

import { SnackBarService } from "./snack-bar.service";

describe("SnackBarService", () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule]
    });
    service = TestBed.inject(SnackBarService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
