import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { ConnectionsState } from "./connections.state";

describe("Connections state", () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([ConnectionsState])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it("should select 'ConnectionsState'", () => {
    const connectionsState = store.selectSnapshot(ConnectionsState);
    expect(connectionsState).toBeTruthy();
  });
});
