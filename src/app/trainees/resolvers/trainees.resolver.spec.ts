import { TraineesResolver } from "./trainees.resolver";
import { Store, NgxsModule } from "@ngxs/store";
import { TestBed, async } from "@angular/core/testing";
import { TraineesState } from "../state/trainees.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("TraineesResolver", () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([TraineesState])],
      providers: []
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it("should create an instance", () => {
    expect(new TraineesResolver(store)).toBeTruthy();
  });
});
