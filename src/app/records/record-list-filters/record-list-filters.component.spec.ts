import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../services/records.service";
import { RecommendationsFilterType } from "../../recommendations/recommendations.interfaces";
import { RecommendationsState } from "../../recommendations/state/recommendations.state";
import { RecordListFiltersComponent } from "./record-list-filters.component";

describe("RecordListFiltersComponent", () => {
  let store: Store;
  let component: RecordListFiltersComponent;
  let fixture: ComponentFixture<RecordListFiltersComponent>;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: "", component: RecordListFiltersComponent }
        ]),
        NgxsModule.forRoot([RecommendationsState]),
        HttpClientTestingModule
      ],
      declarations: [RecordListFiltersComponent]
    }).compileComponents();
    store = TestBed.inject(Store);
    recordsService = TestBed.inject(RecordsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    recordsService.stateName = "recommendations";
    recordsService.setRecommendationsActions();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("`filterRecords()` should dispatch `AllDoctorsFilter` event", () => {
    spyOn(recordsService, "filter");
    component.filterRecords(RecommendationsFilterType.ALL_DOCTORS);
    expect(recordsService.filter).toHaveBeenCalledWith(
      RecommendationsFilterType.ALL_DOCTORS
    );
  });

  it("`filterRecords()` should dispatch `UnderNoticeFilter` event", () => {
    spyOn(recordsService, "filter");
    component.filterRecords(RecommendationsFilterType.UNDER_NOTICE);
    expect(recordsService.filter).toHaveBeenCalledWith(
      RecommendationsFilterType.UNDER_NOTICE
    );
  });

  it("`filterRecords()` should invoke `recordsService.resetSortPageAndSearch()`", () => {
    spyOn(recordsService, "resetSortPageAndSearch").and.callThrough();
    component.filterRecords(RecommendationsFilterType.UNDER_NOTICE);
    expect(recordsService.resetSortPageAndSearch).toHaveBeenCalled();
  });

  it("`filterRecords()` should invoke `updateRoute()`", () => {
    spyOn(recordsService, "updateRoute");
    component.filterRecords(RecommendationsFilterType.ALL_DOCTORS);
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });
});
