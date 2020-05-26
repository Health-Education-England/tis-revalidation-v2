import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SimpleChange, SimpleChanges } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Sort as ISort } from "@angular/material/sort/sort";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { of } from "rxjs";
import { RevalidationStatus } from "../../../trainee/revalidation-history.interface";
import { TraineesState } from "../../../trainees/state/trainees.state";
import { ITrainee } from "../../../trainees/trainees.interfaces";
import { MaterialModule } from "../../material/material.module";
import { RecordsService } from "../services/records.service";
import { RecordListComponent } from "./record-list.component";

const mockSimpleChanges: SimpleChanges = {
  stateName: new SimpleChange(null, "trainees", null)
};

describe("RecordListComponent", () => {
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
        NgxsModule.forRoot([TraineesState])
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
    recordsService = TestBed.inject(RecordsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should invoke 'setupInitialSorting' on init", () => {
    spyOn(component, "setupInitialSorting");
    component.ngOnChanges(mockSimpleChanges);
    expect(component.setupInitialSorting).toHaveBeenCalled();
  });

  it("should invoke 'setupInitialPagination' on init", () => {
    spyOn(component, "setupInitialPagination");
    component.ngOnChanges(mockSimpleChanges);
    expect(component.setupInitialPagination).toHaveBeenCalled();
  });

  it("should invoke 'checkInitialSearchQuery' on init", () => {
    spyOn(component, "checkInitialSearchQuery");
    component.ngOnChanges(mockSimpleChanges);
    expect(component.checkInitialSearchQuery).toHaveBeenCalled();
  });

  it("should invoke 'recordsService.get()' on ngOnChanges", () => {
    spyOn(recordsService, "get");
    component.ngOnChanges(mockSimpleChanges);
    expect(recordsService.get).toHaveBeenCalled();
  });

  it("'setupInitialSorting()' should invoke 'recordsService.sort()' if both params exist", () => {
    spyOn(recordsService, "sort");
    spyOn(recordsService, "resetSort");

    component.params = {
      active: "doctorFirstName",
      direction: "asc"
    };
    component.setupInitialSorting();

    expect(recordsService.sort).toHaveBeenCalledWith(
      component.params.active,
      component.params.direction
    );
    expect(recordsService.resetSort).not.toHaveBeenCalled();
  });

  it("'setupInitialSorting()' should invoke 'recordsService.resetSort()' if both params don't exist", () => {
    spyOn(recordsService, "sort");
    spyOn(recordsService, "resetSort");

    component.params = {};
    component.setupInitialSorting();

    expect(recordsService.sort).not.toHaveBeenCalled();
    expect(recordsService.resetSort).toHaveBeenCalled();
  });

  it("'setupInitialPagination()' should invoke 'recordsService.paginate()' if param exists", () => {
    spyOn(recordsService, "paginate");
    spyOn(recordsService, "resetPaginator");

    component.params = { pageIndex: 4 };
    component.setupInitialPagination();

    expect(recordsService.paginate).toHaveBeenCalledWith(
      component.params.pageIndex
    );
    expect(recordsService.resetPaginator).not.toHaveBeenCalled();
  });

  it("'setupInitialPagination()' should invoke 'recordsService.resetPaginator()' if param does not exist", () => {
    spyOn(recordsService, "resetPaginator");
    spyOn(recordsService, "paginate");

    component.params = {};
    component.setupInitialPagination();

    expect(recordsService.resetPaginator).toHaveBeenCalled();
    expect(recordsService.paginate).not.toHaveBeenCalledWith(
      component.params.pageIndex
    );
  });

  it("'checkInitialSearchQuery()' should invoke 'recordsService.search()' if param exists", () => {
    spyOn(recordsService, "search");

    component.params = { searchQuery: "429123" };
    component.ngOnChanges(mockSimpleChanges);

    expect(recordsService.search).toHaveBeenCalledWith(
      component.params.searchQuery
    );
  });

  it("'navigateToDetails()' should navigate to details route", () => {
    const mockEvent: Event = new MouseEvent("click");
    const mockTrainee: ITrainee = {
      dateAdded: "2015-05-14",
      doctorFirstName: "Bobby",
      doctorLastName: "Brown",
      gmcReferenceNumber: "7777777",
      sanction: "No",
      submissionDate: "2018-05-14",
      underNotice: "No",
      admin: "",
      cctDate: "2015-09-08",
      doctorStatus: RevalidationStatus.NOT_STARTED,
      lastUpdatedDate: "2015-09-08",
      programmeMembershipType: "",
      programmeName: ""
    };

    spyOn(mockEvent, "preventDefault");
    spyOn(router, "navigate");

    component.detailsRoute = "/trainee";
    component.navigateToDetails(mockEvent, mockTrainee);
    expect(router.navigate).toHaveBeenCalledWith([
      component.detailsRoute,
      mockTrainee.gmcReferenceNumber
    ]);
  });

  it("should sort trainees", () => {
    const mockSortEvent: ISort = {
      active: "doctorFirstName",
      direction: "asc"
    };

    spyOn(recordsService, "sort");
    spyOn(recordsService, "resetPaginator");
    spyOn(recordsService, "get").and.returnValue(of({}));
    spyOn(recordsService, "updateRoute");

    component.stateName = "trainees";
    component.sort(mockSortEvent);

    expect(recordsService.sort).toHaveBeenCalledWith(
      mockSortEvent.active,
      mockSortEvent.direction
    );
    expect(recordsService.resetPaginator).toHaveBeenCalled();
    expect(recordsService.get).toHaveBeenCalled();
    expect(recordsService.updateRoute).toHaveBeenCalledWith(
      component.stateName
    );
  });
});
