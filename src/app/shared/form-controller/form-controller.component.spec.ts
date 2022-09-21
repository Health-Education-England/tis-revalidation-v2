import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
  AutocompleteControl,
  FormControlBase
} from "../form-controls/form-contol-base.model";
import { MaterialAutocompleteComponent } from "../form-controls/material-autocomplete/material-autocomplete.component";
import { MaterialModule } from "../material/material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormControllerComponent } from "./form-controller.component";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("FormControllerComponent", () => {
  let component: FormControllerComponent;
  let fixture: ComponentFixture<FormControllerComponent>;

  const formControls: (FormControlBase | AutocompleteControl)[] = [
    {
      key: "selectionList1_Key",
      label: "selection List 1 Label",
      options: [
        {
          key: "selectionList1_OptionKey1",
          value: "selection List 1 Option Value 1"
        },
        {
          key: "selectionList1_OptionKey2",
          value: "selection List 1 Option Value 2"
        },
        {
          key: "selectionList1_OptionKey3",
          value: "selection List 1 Option Value 3"
        }
      ],
      order: 1,
      controlType: "selectionList",
      initialValue: []
    },
    {
      key: "selectionList2_Key",
      label: "selection List 2 Label",
      options: [
        {
          key: "selectionList2_OptionKey1",
          value: "selection List 2 Option Value 1"
        },
        {
          key: "selectionList2_OptionKey2",
          value: "selection List 2 Option Value 2"
        },
        {
          key: "selectionList2_OptionKey3",
          value: "selection List 2 Option Value 3"
        },
        {
          key: "selectionList2_OptionKey4",
          value: "selection List 2 Option Value 4"
        }
      ],
      order: 4,
      controlType: "selectionList",
      initialValue: []
    },
    {
      key: "autocomplete_key",
      label: "autocomplete label",
      order: 4,
      initialValue: "",
      controlType: "autocomplete",
      serviceMethod: "loadMovies",
      placeholder: "Start typing..."
    }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [FormControllerComponent, MaterialAutocompleteComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a form control when set", () => {
    component.control = {
      key: "autocompleteKey",
      label: "autocomplete label",
      order: 4,
      initialValue: "",
      controlType: "autocomplete",
      placeholder: "Start typing..."
    };
    component.form = new FormGroup({
      autocompleteKey: new FormControl("")
    });
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css("app-material-autocomplete"))
        .nativeElement
    ).toBeTruthy();
  });
});
