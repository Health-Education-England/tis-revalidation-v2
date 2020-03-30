import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { RevalidationNotesComponent } from "./revalidation-notes.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

describe("RevalidationNotesComponent", () => {
  let component: RevalidationNotesComponent;
  let fixture: ComponentFixture<RevalidationNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule],
      declarations: [RevalidationNotesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: MatBottomSheetRef, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidationNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
