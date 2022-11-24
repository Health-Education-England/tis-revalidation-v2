import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Sort as ISort } from "@angular/material/sort/sort";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { AdminsModule } from "../../admins/admins.module";
import { ClearAllocateList } from "../../admins/state/admins.actions";
import { AdminsState } from "../../admins/state/admins.state";
import { COLUMN_DATA } from "../../concerns/constants";
import {
  RecommendationStatus,
  RecommendationGmcOutcome
} from "../../recommendation/recommendation-history.interface";
import { IRecommendation } from "../../recommendations/recommendations.interfaces";
import { mockRecommendationsResponse } from "../../recommendations/services/recommendations.service.spec";
import { RecommendationsState } from "../../recommendations/state/recommendations.state";
import { MaterialModule } from "../../shared/material/material.module";
import { DEFAULT_SORT, generateColumnData } from "../constants";
import { RecordsService } from "../services/records.service";
import { RecordListComponent } from "./record-list.component";
import { RecordListState } from "./state/record-list.state";

describe("RecordListComponent", () => {
  let store: Store;
  let component: RecordListComponent;
  let fixture: ComponentFixture<RecordListComponent>;
  let router: Router;
  let recordsService: RecordsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecordListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AdminsModule,
        NgxsModule.forRoot([RecommendationsState, AdminsState, RecordListState])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    recordsService = TestBed.inject(RecordsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListComponent);
    component = fixture.componentInstance;
    recordsService.stateName = "recommendations";
    recordsService.columnData$.next(generateColumnData(COLUMN_DATA));
    recordsService.setRecommendationsActions();
    store.reset({
      recommendations: {
        items: mockRecommendationsResponse.recommendationInfo,
        totalResults: 2,
        sort: { active: "submissionDate", direction: "asc" },
        enableAllocateAdmin: false,
        enableUpdateConnections: false,
        disableSearchAndSort: false,
        allChecked: false,
        someChecked: false
      },
      recordList: { fixedColumns: true }
    });
    component.columnData = generateColumnData(COLUMN_DATA);
    component.dateColumns = [
      "curriculumEndDate,submissionDate,dateAdded,lastUpdatedDate"
    ];

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Should display a table containing doctors summary data", () => {
    expect(
      fixture.debugElement.nativeElement.querySelector(".mat-table")
    ).toBeTruthy();
  });

  it("Should display message when no records returned", () => {
    store.reset({
      recommendations: { totalResults: 0 }
    });
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector(".no-records")
    ).toBeTruthy();
  });

  it("Should apply fixed class to table columns when display in fixed width mode", async () => {
    expect(
      fixture.debugElement.nativeElement.querySelector(".mat-cell.fixed")
    ).toBeTruthy();
  });

  it("Should not apply fixed class to table columns when display in fluid width mode", () => {
    store.reset({
      recordList: { fixedColumns: false }
    });
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector(".mat-cell.fixed")
    ).toBeFalsy();
  });

  it("should select 'items$' from state", () => {
    store.reset({
      recommendations: { items: mockRecommendationsResponse.recommendationInfo }
    });

    component.items$.subscribe((value) => {
      expect(value).toBeInstanceOf(Array);
      expect(value.length).toBe(2);
    });
  });

  it("should select 'sort$' from state", () => {
    store.reset({ recommendations: { sort: DEFAULT_SORT } });

    component.sort$.subscribe((value) => {
      expect(value).toBeInstanceOf(Object);
      expect(value.active).toBe(DEFAULT_SORT.active);
      expect(value.direction).toBe(DEFAULT_SORT.direction);
    });
  });

  it("`columnNames()` should return an array of strings", () => {
    component.columnData = generateColumnData(COLUMN_DATA);
    expect(component.columnNames).toBeInstanceOf(Array);
    expect(component.columnNames[0]).toEqual("doctorFirstName");
  });

  it("'navigateToDetails()' should navigate to details route", () => {
    const mockEvent: Event = new MouseEvent("click");
    const mockRecommendation: IRecommendation = {
      dateAdded: "2015-05-14",
      doctorFirstName: "Bobby",
      doctorLastName: "Brown",
      gmcReferenceNumber: "7777777",
      sanction: "No",
      submissionDate: "2018-05-14",
      underNotice: "No",
      admin: "",
      curriculumEndDate: "2015-09-08",
      doctorStatus: RecommendationStatus.NOT_STARTED,
      lastUpdatedDate: "2015-09-08",
      programmeMembershipType: "",
      programmeName: "",
      designatedBody: "2-RTYTRI",
      gmcOutcome: RecommendationGmcOutcome.APPROVED
    };

    spyOn(mockEvent, "preventDefault");
    spyOn(router, "navigate");

    component.detailsRoute = "/trainee";
    component.navigateToDetails(mockEvent, mockRecommendation, false, false);
    expect(router.navigate).toHaveBeenCalledWith([
      component.detailsRoute,
      mockRecommendation.gmcReferenceNumber
    ]);
  });

  it("should sort recommendations", () => {
    const mockSortEvent: ISort = {
      active: "doctorFirstName",
      direction: "asc"
    };

    spyOn(recordsService, "sort");
    spyOn(recordsService, "resetPaginator").and.callThrough();
    spyOn(recordsService, "updateRoute");

    component.sort(mockSortEvent);

    expect(recordsService.sort).toHaveBeenCalledWith(
      mockSortEvent.active,
      mockSortEvent.direction
    );
    expect(recordsService.resetPaginator).toHaveBeenCalled();
    expect(recordsService.updateRoute).toHaveBeenCalled();
  });

  it("should dispatch `ClearAllocateList` onDestroy lifecycle", () => {
    spyOn(store, "dispatch");
    component.ngOnDestroy();
    expect(store.dispatch).toHaveBeenCalledWith(new ClearAllocateList());
  });
});
