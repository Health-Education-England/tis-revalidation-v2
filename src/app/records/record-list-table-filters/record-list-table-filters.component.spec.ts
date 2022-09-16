import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync
} from "@angular/core/testing";
import { RecordsModule } from "../records.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule, Store } from "@ngxs/store";
import {
  RecommendationsState,
  RecommendationsStateModel
} from "src/app/recommendations/state/recommendations.state";
import { MaterialModule } from "src/app/shared/material/material.module";
import { RecordsService } from "../services/records.service";
import { RecordListTableFiltersComponent } from "./record-list-table-filters.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";
import {
  AutocompleteControl,
  FormControlBase
} from "src/app/shared/form-controls/form-contol-base.model";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { of } from "rxjs";

describe("Record List Table FIlters", () => {
  let store: Store;
  let recordsService: RecordsService;
  let fixture: ComponentFixture<RecordListTableFiltersComponent>;
  let component: RecordListTableFiltersComponent;
  let location: Location;
  let router: Router;
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RecordsModule,
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([RecommendationsState])
      ],
      declarations: [RecordListTableFiltersComponent]
    }).compileComponents();
    store = TestBed.inject(Store);
    recordsService = TestBed.inject(RecordsService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListTableFiltersComponent);
    component = fixture.componentInstance;
    recordsService.stateName = "recommendations";
    recordsService.setRecommendationsActions();
    store.reset({
      recommendations: {
        filter: "underNotice",
        sort: {
          active: "submissionDate",
          direction: "asc"
        },
        pageIndex: 1,
        tableFilters: null
      }
    });

    component.form = recordsService.toFormGroup(
      formControls as FormControlBase[],
      []
    );
    component.formControls = formControls;

    fixture.detectChanges();
  });

  it("should display correct number of controls when data passed", () => {
    expect(
      fixture.debugElement.queryAll(By.css("[data-jasmine='formControl']"))
        .length
    ).toBe(3);
  });

  it("should display correct type of controls when data passed", () => {
    expect(
      fixture.debugElement.queryAll(By.css("mat-selection-list")).length
    ).toBe(2);
    expect(
      fixture.debugElement.queryAll(By.css("mat-autocomplete")).length
    ).toBe(1);
  });

  it("should reset form when 'Clear filters' button is clicked", fakeAsync(() => {
    const spyClearTableFilters = spyOn(
      recordsService,
      "clearTableFilters"
    ).and.returnValue(of(true));
    const matOptions = fixture.debugElement.queryAll(By.css("mat-list-option"));

    matOptions.forEach((matOption) => {
      const matOptionElement = matOption.nativeElement;
      matOptionElement.click();
      tick(500);
      fixture.detectChanges();
      expect(matOptionElement.getAttribute("aria-selected")).toEqual("true");
    });

    const clearFiltersButton = fixture.debugElement.query(
      By.css("[data-jasmine='clearFiltersButton']")
    ).nativeElement;

    clearFiltersButton.click();

    matOptions.forEach((matOption) => {
      const matOptionElement = matOption.nativeElement;
      tick(500);
      fixture.detectChanges();
      expect(matOptionElement.getAttribute("aria-selected")).toEqual("false");
    });

    expect(spyClearTableFilters).toHaveBeenCalled();

    flush();
  }));

  it("should disable submit button when form is blank", () => {
    component.clearFilters();
    fixture.detectChanges();
    const submitFormButton = fixture.debugElement.query(
      By.css("[data-jasmine='submitFormButton']")
    ).nativeElement;
    expect(submitFormButton.getAttribute("disabled")).toEqual("true");
  });

  it("should call onSubmit when submit button is clicked", () => {
    const spySubmitForm = spyOn(component, "onSubmit");
    const matOption = fixture.debugElement.query(By.css("mat-list-option"));
    matOption.nativeElement.click();
    fixture.detectChanges();
    const submitFormButton = fixture.debugElement.query(
      By.css("[data-jasmine='submitFormButton']")
    ).nativeElement;
    submitFormButton.click();
    fixture.detectChanges();
    expect(spySubmitForm).toHaveBeenCalled();
  });

  it("should reset form when 'Clear filters' button is clicked", fakeAsync(() => {
    spyOn(router, "navigate");
    const snapshot: RecommendationsStateModel =
      store.snapshot().recommendations;
    const matOption = fixture.debugElement.query(By.css("mat-list-option"));
    matOption.nativeElement.click();
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(["/"], {
      queryParams: {
        active: snapshot.sort.active,
        direction: snapshot.sort.direction,
        pageIndex: snapshot.pageIndex,
        filter: snapshot.filter,
        selectionList1_Key: "selectionList1_OptionKey1",
        selectionList2_Key: "",
        autocomplete_key: "",
        ...(snapshot.searchQuery && { searchQuery: snapshot.searchQuery })
      }
    });
    flush();
  }));
});
