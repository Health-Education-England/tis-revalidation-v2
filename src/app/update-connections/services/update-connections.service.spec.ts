import { TestBed } from "@angular/core/testing";

import { UpdateConnectionsService } from "./update-connections.service";

describe("UpdateConnectionsService", () => {
  let service: UpdateConnectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateConnectionsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
