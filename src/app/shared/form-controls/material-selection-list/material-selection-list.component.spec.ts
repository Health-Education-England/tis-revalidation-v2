import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MaterialSelectionListComponent } from "./material-selection-list.component";
import { FormControlBase } from "../form-contol-base.model";
import { MaterialModule } from "src/app/shared/material/material.module";
import { RemoveWhitespacePipe } from "../../pipes/remove-whitespace.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

describe("MaterialSelectionListComponent", () => {
  let component: MaterialSelectionListComponent;
  let fixture: ComponentFixture<MaterialSelectionListComponent>;
  let controlProperties: FormControlBase = {
    key: "initialKey",
    label: "initialLabel",
    options: [
      { key: "initialOptionKey1", value: "initial option value 1" },
      { key: "initialOptionKey2", value: "initial option value 2" }
    ],
    order: 1,
    controlType: "selectionList",
    initialValue: []
  };
  let data: any = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, ReactiveFormsModule],
      declarations: [MaterialSelectionListComponent, RemoveWhitespacePipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSelectionListComponent);
    component = fixture.componentInstance;
    component.controlProperties = controlProperties;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the correct form label", () => {
    expect(
      fixture.debugElement.queryAll(By.css(".mat-mdc-list-item"))[0]
        .nativeElement.innerHTML
    ).toContain("initial option value 1");
  });

  it("should update the form label when changed", () => {
    component.controlProperties = {
      key: "testKey",
      label: "testLabel",
      options: [
        { key: "testOptionKey1", value: "test option value 1" },
        { key: "testOptionKey2", value: "test option value 2" }
      ],
      order: 1,
      controlType: "selectionList",
      initialValue: []
    };

    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css(".mat-mdc-list-item"))[0]
        .nativeElement.innerHTML
    ).toContain("test option value 1");
  });
});
