import { TestBed } from "@angular/core/testing";

import { RevalidationNotesService } from "./revalidation-notes.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RevalidationNotesService", () => {
  let service: RevalidationNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RevalidationNotesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
