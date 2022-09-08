import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Component, OnInit } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AutocompleteControl } from "../form-contol-base.model";
import { FormControl, FormGroup } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialAutocompleteComponent } from "./material-autocomplete.component";
import { AutocompleteService } from "./autocomplete.service";
import { of } from "rxjs";

fdescribe("MaterialAutocompleteComponent", () => {
  let component: MaterialAutocompleteComponent;
  let fixture: ComponentFixture<MaterialAutocompleteComponent>;
  let mockAutocompleteService = jasmine.createSpyObj(["getData", "testFunc"]);
  const meta: AutocompleteControl = {
    key: "initialKey",
    label: "initialLabel",
    order: 1,
    controlType: "autocomplete",
    serviceMethod: "mockServiceName",
    initialValue: []
  };
  const data = {};
  const options: string[] = ["apple", "banana", "cherry", "date"];

  const toFormGroup = (): FormGroup => {
    const group: any = {};
    group[meta.key] = new FormControl(data[meta.key] || "");
    return new FormGroup(group);
  };
  const initAutocomplete = (inputValue: string, ops: string[] = options) => {
    mockAutocompleteService.getData.and.returnValue(of(ops));

    const inputElement = fixture.debugElement.query(By.css("input"));
    inputElement.nativeElement.dispatchEvent(new Event("focusin"));
    inputElement.nativeElement.value = inputValue;
    inputElement.nativeElement.dispatchEvent(new Event("input"));
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AutocompleteService, useValue: mockAutocompleteService }
      ],
      declarations: [MaterialAutocompleteComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialAutocompleteComponent);
    component = fixture.componentInstance;
    component.meta = {
      key: "initialKey",
      label: "initialLabel",
      order: 1,
      controlType: "autocomplete",
      serviceMethod: "mockServiceName",
      initialValue: []
    };
    component.form = toFormGroup();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the correct label", () => {
    expect(
      fixture.debugElement.query(By.css("mat-label")).nativeElement.innerHTML
    ).toContain("initialLabel");
  });

  it("should not display options when input is < 5 characters", async () => {
    component.minLengthTerm = 5;
    initAutocomplete("four");
    await fixture.whenStable();
    fixture.detectChanges();

    const matOptions = document.querySelectorAll("mat-option");
    expect(matOptions.length).toBe(0);
  });

  it("should display correct options in dropdown when input length >= 5", async () => {
    component.minLengthTerm = 5;
    initAutocomplete("query");
    await fixture.whenStable();
    fixture.detectChanges();

    const matOptions = document.querySelectorAll("mat-option");
    expect(matOptions.length).toBe(options.length);
    expect(matOptions[0].innerHTML).toContain(options[0]);
  });

  it("should display error when no options found", async () => {
    initAutocomplete("query", []);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css(".mat-error")).length).toBe(1);
  });
});
