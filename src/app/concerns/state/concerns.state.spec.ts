import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { ConcernsState } from "./concerns.state";

describe("Concerns actions", () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([ConcernsState])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it("should select 'ConcernsState'", () => {
    const concernsState = store.selectSnapshot(ConcernsState);
    expect(concernsState).toBeTruthy();
  });
});
