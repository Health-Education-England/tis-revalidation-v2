import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../../records/services/records.service";
import { RecommendationsFilterType } from "../recommendations.interfaces";
import { FilterRecommendations } from "../state/recommendations.actions";
import { RecommendationsState } from "../state/recommendations.state";

import { RecommendationsFiltersComponent } from "./recommendations-filters.component";

describe("RecommendationsFiltersComponent", () => {
  let store: Store;
  let component: RecommendationsFiltersComponent;
  let fixture: ComponentFixture<RecommendationsFiltersComponent>;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: "", component: RecommendationsFiltersComponent }
        ]),
        NgxsModule.forRoot([RecommendationsState]),
        HttpClientTestingModule
      ],
      declarations: [RecommendationsFiltersComponent]
    }).compileComponents();
    store = TestBed.inject(Store);
    recordsService = TestBed.inject(RecordsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    recordsService.stateName = "recommendations";
    recordsService.setRecommendationsActions();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("`filterByAllDoctors()` should dispatch `AllDoctorsFilter` event", () => {
    spyOn(store, "dispatch").and.callThrough();
    component.filterByAllDoctors();
    expect(store.dispatch).toHaveBeenCalledWith(
      new FilterRecommendations(RecommendationsFilterType.ALL_DOCTORS)
    );
  });

  it("`filterByAllDoctors()` should invoke `getRecommendations()`", () => {
    spyOn(component, "getRecommendations");
    component.filterByAllDoctors();
    expect(component.getRecommendations).toHaveBeenCalled();
  });

  it("`filterByUnderNotice()` should dispatch `UnderNoticeFilter` event", () => {
    spyOn(store, "dispatch").and.callThrough();
    component.filterByUnderNotice();
    expect(store.dispatch).toHaveBeenCalledWith(
      new FilterRecommendations(RecommendationsFilterType.UNDER_NOTICE)
    );
  });

  it("`filterByUnderNotice()` should invoke `getRecommendations()`", () => {
    spyOn(component, "getRecommendations");
    component.filterByUnderNotice();
    expect(component.getRecommendations).toHaveBeenCalled();
  });

  it("`getRecommendations()` should invoke `recordsService.resetSortPageAndSearch()`", () => {
    spyOn(recordsService, "resetSortPageAndSearch").and.callThrough();
    component.getRecommendations();
    expect(recordsService.resetSortPageAndSearch).toHaveBeenCalled();
  });

  it("`getRecommendations()` should invoke `updateRoute()`", () => {
    spyOn(recordsService, "updateRoute");
    component.getRecommendations();
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });
});
