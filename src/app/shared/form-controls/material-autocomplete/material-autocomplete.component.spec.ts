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

describe("MaterialAutocompleteComponent", () => {
  let component: MaterialAutocompleteComponent;
  let fixture: ComponentFixture<MaterialAutocompleteComponent>;
  let mockAutocompleteService = jasmine.createSpyObj(["getMatchingItems"]);

  const data = {};
  const options: string[] = ["apple", "banana", "cherry", "date"];
  const enterSearchItemsAndSubmit = (
    inputValue: string,
    searchOptions: string[] = options
  ) => {
    mockAutocompleteService.getMatchingItems.and.returnValue(of(searchOptions));

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
    component.controlProperties = {
      key: "initialKey",
      label: "initialLabel",
      order: 1,
      controlType: "autocomplete",
      serviceMethod: "mockServiceName",
      initialValue: []
    };
    const group: any = {};
    group[component.controlProperties.key] = new FormControl(
      data[component.controlProperties.key] || ""
    );
    component.form = new FormGroup(group);
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
    enterSearchItemsAndSubmit("four");
    await fixture.whenStable();
    fixture.detectChanges();

    const matOptions = document.querySelectorAll("mat-option");
    expect(matOptions.length).toBe(0);
  });

  it("should display correct options in dropdown when input length >= 5", async () => {
    component.minLengthTerm = 5;
    enterSearchItemsAndSubmit("query");
    await fixture.whenStable();
    fixture.detectChanges();

    const matOptions = document.querySelectorAll("mat-option");
    expect(matOptions.length).toBe(options.length);
    expect(matOptions[0].innerHTML).toContain(options[0]);
  });

  it("should display error when no options found", async () => {
    enterSearchItemsAndSubmit("query", []);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css(".mat-error")).length).toBe(1);
  });
  it("should not display the clear button when input is empty", async () => {
    enterSearchItemsAndSubmit("", []);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css("[data-jasmine='clearInputButton']"))
        .length
    ).toBe(0);
  });

  it("should display the clear button when input contains text", async () => {
    enterSearchItemsAndSubmit("qw", []);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css("[data-jasmine='clearInputButton']"))
        .length
    ).toBe(1);
  });
});
