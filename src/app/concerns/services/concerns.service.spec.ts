import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { ConcernsState } from "../state/concerns.state";

import { ConcernsService } from "./concerns.service";

describe("ConcernsService", () => {
  let service: ConcernsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([ConcernsState])
      ]
    });
    service = TestBed.inject(ConcernsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
