import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AllocateAdminActionsComponent } from "./allocate-admin-actions.component";

describe("AllocateAdminActionsComponent", () => {
  let component: AllocateAdminActionsComponent;
  let fixture: ComponentFixture<AllocateAdminActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllocateAdminActionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateAdminActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
