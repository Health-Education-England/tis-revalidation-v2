import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, async } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { UnderNoticeState } from "./under-notice.state";
import { GetUnderNoticeTrainees } from "./under-notice.actions";

describe("UnderNotice actions", () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UnderNoticeState]), HttpClientTestingModule]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it("should select 'Under notice' state", () => {
    store.dispatch(new GetUnderNoticeTrainees());
    store.reset({
      underNotice: {
        items: []
      }
    });
    const underNotice = store.selectSnapshot(state => state.underNotice);
    expect(underNotice).toBeTruthy();
  });

  it("should dispatch an action and get trainees", () => {
    store.dispatch(new GetUnderNoticeTrainees());
    store.reset({
      underNotice: {
        items: [
          {
            firstName: "Bobby",
            lastName: "Brown",
            gmcNumber: "7777777",
            programmeMembershipType: "test 1",
            status: "test 1",
            traineeType: "test 1",
            lastUpdated: "2015-05-14"
          }
        ]
      }
    });
    const underNotice = store.selectSnapshot(state => state.underNotice);
    expect(underNotice.items.length).toEqual(1);
    expect(underNotice.items[0].firstName).toEqual("Bobby");
  });
});
