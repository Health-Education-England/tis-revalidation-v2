import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { GetUnderNoticeTrainees } from "./state/under-notice.actions";
import { UnderNoticeState } from "./state/under-notice.state";
import { UnderNoticeComponent } from "./under-notice.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("UnderNoticeComponent", () => {
  let store: Store;
  let component: UnderNoticeComponent;
  let fixture: ComponentFixture<UnderNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnderNoticeComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([UnderNoticeState]),
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch 'GetUnderNoticeTrainees' on init", () => {
    spyOn(store, "dispatch");
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new GetUnderNoticeTrainees());
  });
});
