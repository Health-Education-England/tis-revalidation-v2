import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { RecommendationsState } from "../../recommendations/state/recommendations.state";
import { MaterialModule } from "../../shared/material/material.module";
import { RecordsService } from "../services/records.service";
import { ResetRecordListComponent } from "./reset-record-list.component";

describe("ResetRecordListComponent", () => {
  let component: ResetRecordListComponent;
  let fixture: ComponentFixture<ResetRecordListComponent>;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetRecordListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: "", component: ResetRecordListComponent }
        ]),
        NgxsModule.forRoot([RecommendationsState]),
        HttpClientTestingModule
      ]
    }).compileComponents();
    recordsService = TestBed.inject(RecordsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    recordsService.stateName = "recommendations";
    recordsService.setRecommendationsActions();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit `resetSearchForm$` event on resetRecordList()", () => {
    spyOn(recordsService.resetSearchForm$, "next").and.callThrough();
    component.resetRecordList();
    expect(recordsService.resetSearchForm$.next).toHaveBeenCalledWith(true);
  });

  it("should invoke `recordsService.resetRecordsState()` to reset recommendations list", () => {
    spyOn(recordsService, "resetRecordsState").and.callThrough();
    component.resetRecordList();
    expect(recordsService.resetRecordsState).toHaveBeenCalled();
  });

  it("should invoke `recordsService.updateRoute()` on resetRecordList()", () => {
    spyOn(recordsService, "updateRoute");
    component.resetRecordList();
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });
});
