import { TestBed } from "@angular/core/testing";

import { CommentsService } from "./comments.service";
import { ReactiveFormsModule } from "@angular/forms";

describe("CommentsService", () => {
  let service: CommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule]
    });
    service = TestBed.inject(CommentsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
