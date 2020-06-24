import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ConnectionsService } from "./connections.service";

describe("ConnectionsService", () => {
  let connectionsService: ConnectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    connectionsService = TestBed.inject(ConnectionsService);
  });

  it("should be created", () => {
    expect(connectionsService).toBeTruthy();
  });
});
