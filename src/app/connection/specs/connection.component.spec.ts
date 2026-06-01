import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { of, Subscription, throwError } from "rxjs";

import { MaterialModule } from "../../shared/material/material.module";
import { ConnectionState } from "../state/connection.state";
import { ConnectionComponent } from "../connection.component";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import { ActionType } from "../../update-connections/update-connections.interfaces";
import { UpdateConnectionsService } from "../../update-connections/services/update-connections.service";
import { RouterModule } from "@angular/router";
import { ConnectionHistoryComponent } from "../connection-history/connection-history.component";
import { mockConnectionResponse } from "./mock-data/connection-details-spec-data";
import { Pipe, PipeTransform } from "@angular/core";
import { ConnectionHiddenDiscrepanciesComponent } from "../connection-hidden-discrepancies/connection-hidden-discrepancies.component";
import { By } from "@angular/platform-browser";
import { ConnectionService } from "../services/connection.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { FormatDesignatedBodyPipe } from "src/app/shared/pipes/format-designated-body.pipe";
import { DetailsSideNavState } from "src/app/details/details-side-nav/state/details-side-nav.state";
import {
  CONNECTION_ACTIONS,
  HIDE_DISCREPANCY_ACTION
} from "src/app/update-connections/constants";
import { AuthService } from "src/app/core/auth/auth.service";

@Pipe({ name: "formatDesignatedBody" })
class MockFormatDesignatedBodyPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

@Pipe({ name: "AdminName" })
class MockAdminNamePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

const matDialogMock = {
  open: () => ({
    afterClosed: () => of(true)
  })
};

describe("ConnectionComponent", () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;
  let updateConnectionService: UpdateConnectionsService;
  let snackBarService: SnackBarService;
  let connectionService: ConnectionService;
  let store: Store;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ConnectionState, DetailsSideNavState]),
        HttpClientTestingModule,
        MaterialModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        ConnectionComponent,
        ConnectionHistoryComponent,
        ConnectionHiddenDiscrepanciesComponent,
        MockFormatDesignatedBodyPipe,
        MockAdminNamePipe,
        ConfirmDialogComponent
      ],
      providers: [
        FormatDesignatedBodyPipe,
        ConnectionService,
        AuthService,
        { provide: MatDialog, useValue: matDialogMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    updateConnectionService = TestBed.inject(UpdateConnectionsService);
    snackBarService = TestBed.inject(SnackBarService);
    fixture = TestBed.createComponent(ConnectionComponent);
    store = TestBed.inject(Store);
    connectionService = TestBed.inject(ConnectionService);
    authService = TestBed.inject(AuthService);
    store.reset({
      traineeDetails: {
        item: {
          gmcNumber: null,
          forenames: null,
          surname: null,
          curriculumEndDate: null,
          programmeMembershipType: null,
          programmeName: null,
          tcsDesignatedBody: "1-ABCDEF",
          programmeEndDate: null,
          currentGrade: null,
          tisPersonId: null,
          notes: []
        }
      },
      connection: {
        gmcNumber: null,
        connectionHistory: mockConnectionResponse.connection.connectionHistory,
        hiddenDiscrepancies: mockConnectionResponse.hiddenDiscrepancies,
        doctorCurrentDbc: null
      }
    });
    component = fixture.componentInstance;
    authService.userDesignatedBodies = ["1-1RUZV1D"];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should unsubscribe from subscriptions upon `ngOnDestroy()`", () => {
    spyOn(component.subscriptions, "unsubscribe");
    component.ngOnDestroy();
    expect(component.subscriptions.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it("should invoke updateConnection in UpdateConnectionService with add action and data", () => {
    spyOn(updateConnectionService, "updateConnection").and.callThrough();

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interest",
      dbc: "1-FGHIJ"
    };

    component.doctorCurrentDbc = "1-ABCDE";
    component.gmcNumber = 123456;

    component.updateConnection(formValue);

    expect(component.submitting).toBeTruthy();
    expect(updateConnectionService.updateConnection).toHaveBeenCalledWith(
      {
        changeReason: "Conflict of interest",
        designatedBodyCode: "1-FGHIJ",
        doctors: [
          {
            gmcId: 123456,
            currentDesignatedBodyCode: "1-ABCDE",
            programmeOwnerDesignatedBodyCode: "1-ABCDEF"
          }
        ],
        admin: ""
      },
      ActionType.ADD_CONNECTION
    );
  });

  it("should openSnackBar with error message when updateConnection request failed", () => {
    const message = "Request failed";
    spyOn(snackBarService, "openSnackBar");
    spyOn(updateConnectionService, "updateConnection").and.returnValue(
      throwError(() => new Error(message))
    );

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interset",
      dbc: "1-FGHIJ"
    };

    component.doctorCurrentDbc = "1-ABCDE";
    component.gmcNumber = 123456;
    component.updateConnection(formValue);
    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(message);
  });

  it("should openSnackBar with message and invoke Get() when updateConnection request is success", () => {
    const message = "Connection updated!";
    spyOn(snackBarService, "openSnackBar");
    spyOn(updateConnectionService, "updateConnection").and.returnValue(
      of({ message })
    );

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interset",
      dbc: "1-FGHIJ"
    };

    component.doctorCurrentDbc = "1-ABCDE";
    component.gmcNumber = 123456;
    component.updateConnection(formValue);

    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(message);
    expect(component.submitting).toBeFalsy();
  });

  it("should invoke updateConnection in UpdateConnectionService with remove action and data", () => {
    spyOn(updateConnectionService, "updateConnection").and.callThrough();

    const formValue = {
      action: ActionType.REMOVE_CONNECTION,
      reason: "Conflict of interset"
    };

    component.doctorCurrentDbc = "1-ABCDE";
    component.gmcNumber = 123456;
    component.updateConnection(formValue);

    expect(component.submitting).toBeTruthy();
    expect(updateConnectionService.updateConnection).toHaveBeenCalledWith(
      {
        changeReason: "Conflict of interset",
        designatedBodyCode: null,
        doctors: [
          {
            gmcId: 123456,
            currentDesignatedBodyCode: "1-ABCDE",
            programmeOwnerDesignatedBodyCode: "1-ABCDEF"
          }
        ],
        admin: ""
      },
      ActionType.REMOVE_CONNECTION
    );
  });

  it("should display hidden discrepancies details component when available", () => {
    expect(
      fixture.debugElement.query(
        By.css("[data-testid='component-hidden-discrepancies']")
      )
    ).toBeTruthy();
  });

  it("should NOT display hidden discrepancies details component when user DBC does not match", () => {
    authService.userDesignatedBodies = [];
    component.ngOnInit();
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(
        By.css("[data-testid='component-hidden-discrepancies']")
      )
    ).toBeFalsy();
  });

  it("should NOT display hidden discrepancies details component when NONE available", () => {
    store.reset({
      connection: {
        gmcNumber: null,
        connectionHistory: mockConnectionResponse.connection.connectionHistory,
        hiddenDiscrepancies: [],
        doctorCurrentDbc: null
      }
    });
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(
        By.css("[data-testid='component-hidden-discrepancies']")
      )
    ).toBeFalsy();
  });

  it("should call 'showDiscrepancy' service method on 'show' event", () => {
    const storeSpy = spyOn(store, "dispatch");
    const serviceSpy = spyOn(
      connectionService,
      "showDiscrepancy"
    ).and.returnValue(of(void 0));
    component.showDiscrepancy({
      discrepancyId: "69cb99444dadd14f27a0d092",
      hiddenForDesignatedBodyCode: "1-1RUZV1D"
    });
    expect(serviceSpy).toHaveBeenCalledWith("69cb99444dadd14f27a0d092");
    expect(storeSpy).toHaveBeenCalled();
  });

  it("should include 'Hide discrepancy' action when programmeOwner !== DBC", () => {
    const actionsSpy = spyOn(updateConnectionService.actions$, "next");
    store.reset({
      traineeDetails: {
        item: {
          tcsDesignatedBody: "1-ABCDEF"
        }
      },
      connection: {
        doctorCurrentDbc: "1-UVWXYZ"
      }
    });
    fixture.detectChanges();
    expect(actionsSpy).toHaveBeenCalledWith([
      ...CONNECTION_ACTIONS,
      { ...HIDE_DISCREPANCY_ACTION }
    ]);
  });

  it("should NOT include 'Hide discrepancy' action when programmeOwner === DBC", () => {
    const actionsSpy = spyOn(updateConnectionService.actions$, "next");
    store.reset({
      traineeDetails: {
        item: {
          tcsDesignatedBody: "1-ABCDEF"
        }
      },
      connection: {
        doctorCurrentDbc: "1-ABCDEF"
      }
    });
    fixture.detectChanges();
    expect(actionsSpy).toHaveBeenCalledWith([...CONNECTION_ACTIONS]);
  });

  it("should invoke hideDiscrepancy in UpdateConnectionService with correct data", () => {
    spyOn(updateConnectionService, "hideDiscrepancy").and.callThrough();

    const formValue = {
      action: ActionType.HIDE_DISCREPANCY,
      reason: "Test reason for hiding discrepancy"
    };

    component.doctorCurrentDbc = "1-ABCDE";
    component.gmcNumber = 123456;
    component.updateConnection(formValue);

    expect(component.submitting).toBeTruthy();
    expect(updateConnectionService.hideDiscrepancy).toHaveBeenCalledWith({
      adminDesignatedBodyCodes: ["1-1RUZV1D"],
      hiddenBy: "",
      reason: "Test reason for hiding discrepancy",
      doctors: [
        {
          gmcId: 123456,
          currentDesignatedBodyCode: "1-ABCDE",
          programmeOwnerDesignatedBodyCode: "1-ABCDEF"
        }
      ]
    });
  });
});
