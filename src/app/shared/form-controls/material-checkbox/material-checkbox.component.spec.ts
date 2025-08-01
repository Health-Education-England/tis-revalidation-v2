import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialCheckboxComponent } from "./material-checkbox.component";
import { FormControlBase } from "../form-contol-base.model";
import { MaterialModule } from "../../material/material.module";
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup
} from "@angular/forms";
import { By } from "@angular/platform-browser";

describe("MaterialCheckboxComponent", () => {
  let component: MaterialCheckboxComponent;
  let fixture: ComponentFixture<MaterialCheckboxComponent>;

  let controlProperties: FormControlBase = {
    key: "checkboxKey",
    label: "Checkbox Label",
    order: 1,
    controlType: "checkbox"
  };
  let data: any = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialCheckboxComponent],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(MaterialCheckboxComponent);
    component = fixture.componentInstance;
    component.controlProperties = controlProperties;
    const group: any = {};
    group[component.controlProperties.key] = new UntypedFormControl(
      data[component.controlProperties.key] || ""
    );
    component.form = new UntypedFormGroup(group);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the correct checkbox label", () => {
    expect(
      fixture.debugElement.query(By.css("label")).nativeElement.innerHTML
    ).toContain("Checkbox Label");
  });
});
