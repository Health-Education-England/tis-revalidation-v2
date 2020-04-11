import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RevalidationFormComponent } from "./revalidation-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";

describe("RevalidationFormComponent", () => {
  let component: RevalidationFormComponent;
  let fixture: ComponentFixture<RevalidationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [RevalidationFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
