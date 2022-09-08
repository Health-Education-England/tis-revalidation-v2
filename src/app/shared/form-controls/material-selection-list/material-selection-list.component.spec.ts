import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, OnInit } from "@angular/core";
import { MaterialSelectionListComponent } from "./material-selection-list.component";
import { FormControlBase } from "../form-contol-base.model";
import { FormControl, FormGroup } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

fdescribe("MaterialSelectionListComponent", () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, ReactiveFormsModule],
      declarations: [MaterialSelectionListComponent, TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the correct form label", () => {
    expect(
      fixture.debugElement.queryAll(By.css(".mat-list-text"))[0].nativeElement
        .innerHTML
    ).toContain("initial option value 1");
  });

  it("should update the form label when changed", () => {
    const meta = {
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

    component.setMeta(meta);
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css(".mat-list-text"))[0].nativeElement
        .innerHTML
    ).toContain("test option value 1");
  });

  @Component({
    selector: `host-component`,
    template: `<form [formGroup]="form">
      <app-material-selection-list
        [meta]="meta"
        [form]="form"
      ></app-material-selection-list>
    </form>`
  })
  class TestHostComponent implements OnInit {
    meta: FormControlBase = {
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
    form: FormGroup;
    data: any = {};

    toFormGroup() {
      const group: any = {};
      group[this.meta.key] = new FormControl(this.data[this.meta.key] || "");
      return new FormGroup(group);
    }
    ngOnInit(): void {
      this.form = this.toFormGroup();
    }
    setMeta(meta: FormControlBase) {
      this.meta = meta;
      this.toFormGroup();
    }
  }
});
