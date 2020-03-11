import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxsModule } from "@ngxs/store";
import { UnderNoticeState } from "./state/under-notice.state";

import { UnderNoticeComponent } from "./under-notice.component";

describe("UnderNoticeComponent", () => {
  let component: UnderNoticeComponent;
  let fixture: ComponentFixture<UnderNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnderNoticeComponent],
      imports: [NgxsModule.forRoot([UnderNoticeState]), HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
