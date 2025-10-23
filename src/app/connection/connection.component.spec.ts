import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { of, Subscription, throwError } from "rxjs";

import { MaterialModule } from "../shared/material/material.module";
import { ConnectionState } from "../connection/state/connection.state";
import { ConnectionComponent } from "./connection.component";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import { ActionType } from "../update-connections/update-connections.interfaces";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { IConnectionHistory } from "./connection.interfaces";

describe("ConnectionComponent", () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;
  let updateConnectionService: UpdateConnectionsService;
  let snackBarService: SnackBarService;
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
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ConnectionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    updateConnectionService = TestBed.inject(UpdateConnectionsService);
    snackBarService = TestBed.inject(SnackBarService);
    fixture = TestBed.createComponent(ConnectionComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
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

  it("should set the expandedElement to null when element is already expanded", () => {
    component.expandedElement = element;
    const event = new MouseEvent("click");
    spyOn(event, "preventDefault");

    component.currentExpanded(element, event);
    expect(component.expandedElement).toBeNull();
  });

  it("should set the expandedElement when connection history row data is passed", () => {
    component.expandedElement = null;
    const event = new MouseEvent("click");
    spyOn(event, "preventDefault");

    component.currentExpanded(element, event);
    expect(component.expandedElement).toBe(element);
  });
});
