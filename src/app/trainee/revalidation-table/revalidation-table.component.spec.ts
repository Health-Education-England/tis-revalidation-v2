import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../../shared/material/material.module";

import { RevalidationTableComponent } from "./revalidation-table.component";

describe("RevalidationTableComponent", () => {
  let component: RevalidationTableComponent;
  let fixture: ComponentFixture<RevalidationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RevalidationTableComponent],
      imports: [MaterialModule, NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
