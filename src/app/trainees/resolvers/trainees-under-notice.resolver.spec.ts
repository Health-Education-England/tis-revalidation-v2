import { TraineesUnderNoticeResolver } from "./trainees-under-notice.resolver";
import { Store, NgxsModule } from "@ngxs/store";
import { TestBed, async } from "@angular/core/testing";
import { TraineesState } from "../state/trainees.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("TraineesUnderNotice.Resolver", () => {
  let underNoticeStore: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([TraineesState])],
      providers: []
    }).compileComponents();
    underNoticeStore = TestBed.inject(Store);
  }));

  it("should create an instance", () => {
    expect(new TraineesUnderNoticeResolver(underNoticeStore)).toBeTruthy();
  });
});
