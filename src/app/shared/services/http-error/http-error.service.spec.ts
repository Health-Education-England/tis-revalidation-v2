import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../material/material.module";
import { HttpErrorService } from "./http-error.service";

describe("HttpErrorService", () => {
  let service: HttpErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MaterialModule] });
    service = TestBed.inject(HttpErrorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
