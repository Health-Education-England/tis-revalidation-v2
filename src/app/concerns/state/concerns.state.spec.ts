import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { ConcernsState } from "./concerns.state";

describe("Concerns state", () => {
  let store: Store;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          NgxsModule.forRoot([ConcernsState])
        ]
      }).compileComponents();
      store = TestBed.inject(Store);
    })
  );

  it("should select 'ConcernsState'", () => {
    const concernsState = store.selectSnapshot(ConcernsState);
    expect(concernsState).toBeTruthy();
  });
});
