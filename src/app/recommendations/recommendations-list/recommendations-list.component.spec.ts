import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { Filter } from "../state/recommendations.actions";
import { RecommendationsState } from "../state/recommendations.state";
import { RecommendationsFilterType } from "../recommendations.interfaces";
import { RecommendationsListComponent } from "./recommendations-list.component";

describe("RecommendationsListComponent", () => {
  let store: Store;
  let component: RecommendationsListComponent;
  let fixture: ComponentFixture<RecommendationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationsListComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([RecommendationsState]),
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("'setupInitialFilter()' should dispatch 'AllDoctorsFilter' if param value is `allDoctors`", () => {
    spyOn(store, "dispatch");

    component.params = { filter: RecommendationsFilterType.ALL_DOCTORS };
    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(RecommendationsFilterType.ALL_DOCTORS)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Filter(RecommendationsFilterType.UNDER_NOTICE)
    );
  });

  it("'setupInitialFilter()' should dispatch 'UnderNoticeFilter' if param does not exist", () => {
    spyOn(store, "dispatch");

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(RecommendationsFilterType.UNDER_NOTICE)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Filter(RecommendationsFilterType.ALL_DOCTORS)
    );
  });
});
