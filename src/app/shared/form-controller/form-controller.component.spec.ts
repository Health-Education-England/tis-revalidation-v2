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
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialSelectionListComponent } from "../form-controls/material-selection-list/material-selection-list.component";
import { RemoveWhitespacePipe } from "../pipes/remove-whitespace.pipe";
import { NgxsModule, Store } from "@ngxs/store";
import { RecordsService } from "src/app/records/services/records.service";
describe("FormControllerComponent", () => {
  let component: FormControllerComponent;
  let fixture: ComponentFixture<FormControllerComponent>;
  let store: Store;
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
      filterType: "discrepancies",
      controlType: "selectionList",
      initialValue: []
    },

    {
      key: "autocompleteKey",
      label: "autocomplete label",
      order: 4,
      initialValue: "",
      controlType: "autocomplete",
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
        ReactiveFormsModule,
        NgxsModule.forRoot()
      ],
      declarations: [
        FormControllerComponent,
        MaterialAutocompleteComponent,
        MaterialSelectionListComponent,
        RemoveWhitespacePipe
      ],
      providers: [Store, RecordsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControllerComponent);
    store = TestBed.inject(Store);
    store.reset({
      connections: {
        filter: "currentConnections",
        sort: {
          active: "submissionDate",
          direction: "asc"
        },
        pageIndex: 1,
        tableFilters: null
      }
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a selection list form control when set", () => {
    component.control = formControls[0];
    component.form = new UntypedFormGroup({
      [formControls[0].key]: new UntypedFormControl("")
    });
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css("app-material-selection-list"))
        .nativeElement
    ).toBeTruthy();
  });

  it("should render an autocomplete form control when set", () => {
    component.control = formControls[1];
    component.form = new UntypedFormGroup({
      [formControls[1].key]: new UntypedFormControl("")
    });
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css("app-material-autocomplete"))
        .nativeElement
    ).toBeTruthy();
  });
});
