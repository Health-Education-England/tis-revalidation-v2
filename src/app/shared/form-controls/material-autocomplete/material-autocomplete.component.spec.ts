import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup
} from "@angular/forms";
import { MaterialModule } from "src/app/shared/material/material.module";

import { By } from "@angular/platform-browser";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialAutocompleteComponent } from "./material-autocomplete.component";
import { AutocompleteService } from "./autocomplete.service";
import { of } from "rxjs";

describe("MaterialAutocompleteComponent", () => {
  let component: MaterialAutocompleteComponent;
  let fixture: ComponentFixture<MaterialAutocompleteComponent>;
  let mockAutocompleteService = jasmine.createSpyObj(["getItems"]);

  const data = {};
  const options: string[] = ["apple", "banana", "cherry", "date"];
  const enterSearchItemsAndSubmit = (
    inputValue: string,
    searchOptions: string[] = [...options]
  ) => {
    mockAutocompleteService.getItems.and.returnValue(of(searchOptions));

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

  it("should display query as first option in dropdown list", async () => {
    const query = "Clinical";
    enterSearchItemsAndSubmit(query);
    await fixture.whenStable();
    fixture.detectChanges();
    const matOptions = document.querySelectorAll("mat-option");
    expect(matOptions[0].innerHTML).toContain(query);
  });

  it("should display correct options in dropdown", async () => {
    const query = "Clinical";
    enterSearchItemsAndSubmit(query);
    await fixture.whenStable();
    fixture.detectChanges();
    const sourceOptions = [query, ...options];
    const matOptions = Array.from(document.querySelectorAll("mat-option"));
    const optionLabels = matOptions.map((option) => option.textContent);
    expect(optionLabels).toEqual([query, ...options]);
  });

  it("should hide dropdown when pressing 'Enter' key", async () => {
    const query = "Clinical";
    const inputElement = fixture.debugElement.query(By.css("input"));

    enterSearchItemsAndSubmit(query);
    await fixture.whenStable();
    fixture.detectChanges();
    inputElement.nativeElement.dispatchEvent(new Event("focusin"));
    const enterKeyEvent = new KeyboardEvent("keydown", {
      key: "Enter"
    });
    inputElement.nativeElement.dispatchEvent(enterKeyEvent);
    fixture.detectChanges();

    const matOptions = document.querySelectorAll("mat-option");
    expect(matOptions.length).toBe(0);
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
