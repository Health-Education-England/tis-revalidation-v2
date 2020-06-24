import { TestBed } from "@angular/core/testing";

import { TraineesService } from "./trainees.service";
import { RouterTestingModule } from "@angular/router/testing";

describe("TraineesService", () => {
  let service: TraineesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(TraineesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
