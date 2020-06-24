import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../../shared/records/services/records.service";
import {
  ClearSearch,
  Filter,
  Get,
  Paginate,
  ResetFilter,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "../state/recommendations.actions";
import { RecommendationsState } from "../state/recommendations.state";

import { ResetRecommendationsListComponent } from "./reset-recommendations-list.component";

describe("ResetRecommendationsListComponent", () => {
  let component: ResetRecommendationsListComponent;
  let fixture: ComponentFixture<ResetRecommendationsListComponent>;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetRecommendationsListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: "", component: ResetRecommendationsListComponent }
        ]),
        NgxsModule.forRoot([RecommendationsState]),
        HttpClientTestingModule
      ]
    }).compileComponents();
    recordsService = TestBed.inject(RecordsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetRecommendationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    recordsService.stateName = "recommendations";
    recordsService.setActions(
      ClearSearch,
      Filter,
      Get,
      Paginate,
      ResetFilter,
      ResetPaginator,
      ResetSort,
      Search,
      Sort
    );
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit `resetSearchForm$` event on resetRecommendationsList()", () => {
    spyOn(recordsService.resetSearchForm$, "next").and.callThrough();
    component.resetRecommendationsList();
    expect(recordsService.resetSearchForm$.next).toHaveBeenCalledWith(true);
  });

  it("should invoke `recordsService.resetRecordsState()` to reset recommendations list", () => {
    spyOn(recordsService, "resetRecordsState").and.callThrough();
    component.resetRecommendationsList();
    expect(recordsService.resetRecordsState).toHaveBeenCalled();
  });

  it("should invoke `recordsService.updateRoute()` on resetRecommendationsList()", () => {
    spyOn(recordsService, "updateRoute");
    component.resetRecommendationsList();
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });
});
