import { TestBed } from "@angular/core/testing";
import { ConcernStatus } from "src/app/concern/concern.interfaces";

import { ApiService } from "./api.service";

describe("ApiService", () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return the enum value when getEnumKey is invoked", () => {
    expect(service.getEnumKey(ConcernStatus, ConcernStatus.OPEN)).toBe("OPEN");
  });
});
