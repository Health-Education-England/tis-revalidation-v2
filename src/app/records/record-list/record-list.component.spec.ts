import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Sort as ISort } from "@angular/material/sort/sort";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { AdminsModule } from "../../admins/admins.module";
import { ClearAllocateList } from "../../admins/state/admins.actions";
import { AdminsState } from "../../admins/state/admins.state";
import { COLUMN_DATA } from "../../concerns/constants";
import { RecommendationStatus } from "../../recommendation/recommendation-history.interface";
import { IRecommendation } from "../../recommendations/recommendations.interfaces";
import { mockRecommendationsResponse } from "../../recommendations/services/recommendations.service.spec";
import { RecommendationsState } from "../../recommendations/state/recommendations.state";
import { MaterialModule } from "../../shared/material/material.module";
import { DEFAULT_SORT, generateColumnData } from "../constants";
import { RecordsService } from "../services/records.service";
import { RecordListComponent } from "./record-list.component";

describe("RecordListComponent", () => {
  let store: Store;
  let component: RecordListComponent;
  let fixture: ComponentFixture<RecordListComponent>;
  let router: Router;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AdminsModule,
        NgxsModule.forRoot([RecommendationsState, AdminsState])
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
    recordsService.setRecommendationsActions();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should select 'items$' from state", () => {
    store.reset({
      recommendations: { items: mockRecommendationsResponse.traineeInfo }
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
      cctDate: "2015-09-08",
      doctorStatus: RecommendationStatus.NOT_STARTED,
      lastUpdatedDate: "2015-09-08",
      programmeMembershipType: "",
      programmeName: "",
      designatedBody: "2-RTYTRI"
    };

    spyOn(mockEvent, "preventDefault");
    spyOn(router, "navigate");

    component.detailsRoute = "/trainee";
    component.navigateToDetails(mockEvent, mockRecommendation, false);
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
