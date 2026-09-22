import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { ConcernsState } from "./concerns.state";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("Concerns state", () => {
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        NgxsModule.forRoot([ConcernsState])],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
    store = TestBed.inject(Store);
  }));

  it("should select 'ConcernsState'", () => {
    const concernsState = store.selectSnapshot(ConcernsState.items);
    expect(concernsState).toBeTruthy();
  });
});
