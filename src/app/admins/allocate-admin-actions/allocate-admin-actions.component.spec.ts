import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of, throwError } from "rxjs";

import { AllocateAdminActionsComponent } from "./allocate-admin-actions.component";
import { RecordsService } from "src/app/records/services/records.service";
import { ClearAllocateList } from "../state/admins.actions";
import { SnackBarService } from "src/app/shared/services/snack-bar/snack-bar.service";
import { MaterialModule } from "src/app/shared/material/material.module";
import { RecommendationsState } from "../../recommendations/state/recommendations.state";
import { AdminsService } from "../services/admins.service";
import { AllocateAdminAutocompleteComponent } from "../allocate-admin-autocomplete/allocate-admin-autocomplete.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminsState } from "../state/admins.state";
import {
  RecommendationGmcOutcome,
  RecommendationStatus
} from "src/app/recommendation/recommendation-history.interface";
import { IRecommendation } from "src/app/recommendations/recommendations.interfaces";
import { IAllocateAdmin } from "../admins.interfaces";

describe("AllocateAdminActionsComponent", () => {
  let component: AllocateAdminActionsComponent;
  let fixture: ComponentFixture<AllocateAdminActionsComponent>;
  let store: Store;
  let recordsService: RecordsService;
  let snackBarService: SnackBarService;
  let adminsService: AdminsService;
  const stateName = "recommendations";

  const admin = "dummy@dummy.com";
  const mockRecommendations: IRecommendation[] = [
    {
      checked: false,
      dateAdded: "2015-05-14",
      doctorFirstName: "Dummy",
      doctorLastName: "Brown",
      gmcReferenceNumber: "8457854",
      sanction: "No",
      submissionDate: "2018-05-14",
      underNotice: "No",
      admin: "",
      curriculumEndDate: "2015-09-08",
      doctorStatus: RecommendationStatus.NOT_STARTED,
      lastUpdatedDate: "2015-09-08",
      programmeMembershipType: "",
      programmeName: "",
      designatedBody: "2-09876",
      gmcOutcome: RecommendationGmcOutcome.APPROVED
    },
    {
      checked: true,
      dateAdded: "2015-05-14",
      doctorFirstName: "Bobby",
      doctorLastName: "Brown",
      gmcReferenceNumber: "7772777",
      sanction: "No",
      submissionDate: "2018-05-14",
      underNotice: "No",
      admin: "",
      curriculumEndDate: "2015-09-08",
      doctorStatus: RecommendationStatus.SUBMITTED_TO_GMC,
      lastUpdatedDate: "2015-09-08",
      programmeMembershipType: "",
      programmeName: "",
      designatedBody: "2-09876",
      gmcOutcome: RecommendationGmcOutcome.APPROVED
    },
    {
      checked: true,
      dateAdded: "2017-09-01",
      doctorFirstName: "Kelly",
      doctorLastName: "Green",
      gmcReferenceNumber: "3654896",
      sanction: "No",
      submissionDate: "2019-01-12",
      underNotice: "No",
      admin: "",
      curriculumEndDate: "2015-09-08",
      doctorStatus: RecommendationStatus.READY_TO_REVIEW,
      lastUpdatedDate: "2015-09-08",
      programmeMembershipType: "",
      programmeName: "",
      designatedBody: "1-345678",
      gmcOutcome: RecommendationGmcOutcome.REJECTED
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AllocateAdminActionsComponent,
        AllocateAdminAutocompleteComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([RecommendationsState, AdminsState]),
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [RecordsService]
    }).compileComponents();

    store = TestBed.inject(Store);
    snackBarService = TestBed.inject(SnackBarService);
    recordsService = TestBed.inject(RecordsService);
    adminsService = TestBed.inject(AdminsService);
  }));

  beforeEach(() => {
    recordsService.stateName = stateName;
    fixture = TestBed.createComponent(AllocateAdminActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    store.reset({
      recommendations: { items: mockRecommendations, enableAllocateAdmin: true }
    });

    spyOn(recordsService, "enableAllocateAdmin").and.callFake(
      (val: boolean) => {
        return of(val);
      }
    );

    spyOn(snackBarService, "openSnackBar");
    spyOn(recordsService, "get").and.stub();
    spyOn(store, "dispatch").and.callThrough();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("on cancel() should call enableAllocateAdmin with false", () => {
    component.cancel();
    expect(recordsService.enableAllocateAdmin).toHaveBeenCalled();
    expect(recordsService.enableAllocateAdmin).toHaveBeenCalledWith(false);
  });

  it("on reset form and selectedAdmin should reset", () => {
    spyOn(adminsService.selectedAdmin$, "next");
    spyOn(adminsService.resetForm$, "next");

    component.reset();

    expect(adminsService.selectedAdmin$.next).toHaveBeenCalledWith(null);
    expect(adminsService.resetForm$.next).toHaveBeenCalled();
  });

  it("on save should invoke snackbarService message when no items selected", () => {
    component.selectedItems = [];
    component.admin = admin;
    component.save();

    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      "Please select doctors and admin to allocate"
    );
  });

  it("on save should invoke snackbarService message when admin is not selected", () => {
    component.admin = null;
    component.save();

    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      "Please select doctors and admin to allocate"
    );
  });

  it("on save should invoke adminsService submitAllocateList with IAllocateAdmin payload", () => {
    spyOn(adminsService, "submitAllocateList").and.callThrough();
    component.admin = admin;
    component.save();

    const expectedPayload: IAllocateAdmin[] = [
      {
        admin,
        gmcNumber: Number(mockRecommendations[1].gmcReferenceNumber)
      },
      {
        admin,
        gmcNumber: Number(mockRecommendations[2].gmcReferenceNumber)
      }
    ];

    expect(adminsService.submitAllocateList).toHaveBeenCalledWith(
      expectedPayload
    );
  });

  it("should show success message when save is successful", () => {
    spyOn(adminsService, "submitAllocateList").and.callFake(() =>
      of("Success")
    );
    component.admin = admin;
    component.save();

    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      "Successfully assigned admins"
    );
  });

  it("should show success message when save is successful", () => {
    spyOn(adminsService, "submitAllocateList").and.callFake(() =>
      throwError("Failed")
    );
    component.admin = admin;
    component.save();

    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      "Failed to assign admins"
    );
  });

  describe("Template testing", () => {
    let template: any;
    let buttons: NodeList;
    let cancelButton: HTMLButtonElement;
    let saveButton: HTMLButtonElement;

    beforeEach(() => {
      component.enableAllocateAdmin$ = of(true);

      spyOn(component, "cancel").and.stub();

      fixture.detectChanges();

      template = fixture.debugElement.nativeElement;
      buttons = template.querySelectorAll("button");
      buttons.forEach((button: Node) => {
        if (button.textContent.includes("Cancel")) {
          cancelButton = button as HTMLButtonElement;
        } else if (button.textContent.includes("Save")) {
          saveButton = button as HTMLButtonElement;
        }
      });
    });

    it("Click Cancel button should call cancel", () => {
      cancelButton.click();
      expect(component.cancel).toHaveBeenCalled();
    });
  });
});
