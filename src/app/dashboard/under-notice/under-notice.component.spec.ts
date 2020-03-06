import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UnderNoticeComponent } from "./under-notice.component";

describe("UnderNoticeComponent", () => {
  let component: UnderNoticeComponent;
  let fixture: ComponentFixture<UnderNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnderNoticeComponent]
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
