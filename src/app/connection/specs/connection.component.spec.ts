import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { of, Subscription, throwError } from "rxjs";

import { MaterialModule } from "../../shared/material/material.module";
import { ConnectionState } from "../state/connection.state";
import { ConnectionComponent } from "../connection.component";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import { ActionType } from "../../update-connections/update-connections.interfaces";
import { UpdateConnectionsService } from "../../update-connections/services/update-connections.service";
import { IConnectionHistory } from "../connection.interfaces";
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

  const element: IConnectionHistory = {
    connectionId: "123456",
    gmcId: "123456",
    gmcClientId: "client-id",
    newDesignatedBodyCode: "1-ASDFG",
    previousDesignatedBodyCode: "1-FGHJK",
    reason: "Some reason",
    reasonMessage: "Some reason",
    requestType: "ADD",
    requestTime: new Date(),
    responseCode: "0",
    responseMessage: "Sussess",
    updatedBy: "bobfossil@hee.nhs.uk"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ConnectionState]),
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

    store.reset({
      connection: {
        gmcNumber: null,
        connectionHistory: mockConnectionResponse.connection.connectionHistory,
        hiddenDiscrepancies:
          mockConnectionResponse.connection.hiddenDiscrepancies,
        doctorCurrentDbc: null
      }
    });
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should unsubscribe from subscriptions upon `ngOnDestroy()`", () => {
    component.componentSubscription = new Subscription();
    spyOn(component.componentSubscription, "unsubscribe");

    component.ngOnDestroy();

    expect(component.componentSubscription.unsubscribe).toHaveBeenCalledTimes(
      1
    );
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
            currentDesignatedBodyCode: "1-ABCDE"
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
      throwError({ message })
    );

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interset",
      dbc: "1-FGHIJ"
    };

    component.doctorCurrentDbc = "1-ABCDE";
    component.gmcNumber = 123456;
    component.updateConnection(formValue);

    expect(component.submitting).toBeTruthy();
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
            currentDesignatedBodyCode: "1-ABCDE"
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
    ).and.returnValue(of(true));
    component.showDiscrepancy({
      discrepancyId: "69cb99444dadd14f27a0d092",
      hiddenForDesignatedBodyCode: "1-1RUZV1D"
    });
    expect(serviceSpy).toHaveBeenCalledWith("69cb99444dadd14f27a0d092");
    expect(storeSpy).toHaveBeenCalled();
  });
});
