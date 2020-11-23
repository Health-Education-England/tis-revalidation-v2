import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from "rxjs";

import { MaterialModule } from "../shared/material/material.module";
import { ConnectionState } from "../connection/state/connection.state";
import { ConnectionComponent } from "./connection.component";
import { mockConnectionResponse } from "./mock-data/conneciton-details-spec-data";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActionType } from "./constants";
import { ConnectionService } from "./services/connection.service";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";

describe("ConnectionComponent", () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;
  let connectionService: ConnectionService;
  let snackBarService: SnackBarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ConnectionState]),
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ConnectionComponent]
    }).compileComponents();
  });

  beforeEach(async () => {
    connectionService = TestBed.inject(ConnectionService);
    snackBarService = TestBed.inject(SnackBarService);
    fixture = TestBed.createComponent(ConnectionComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should change submitting proerty value when setSubitting is invoked", () => {
    expect(component.submitting).toBeFalsy();

    component.setSubmitting(true);
    expect(component.submitting).toBeTruthy();
  });

  it("should return dbc abbrevation when getDBCAbbrevation is called with dbc code", () => {
    component.dbcs = mockConnectionResponse.dbcs;
    expect(component.getDBCAbbrevation("1-AIIDSA")).toBe("HEEM");
  });

  it("should return dbc code when getDBCAbbrevation is called with unavailable dbc code", () => {
    component.dbcs = mockConnectionResponse.dbcs;
    expect(component.getDBCAbbrevation("1-RANDOM")).toBe("1-RANDOM");
  });

  it("should unsubscribe from subscriptions upon `ngOnDestroy()`", () => {
    component.componentSubscription = new Subscription();
    spyOn(component.componentSubscription, "unsubscribe");

    component.ngOnDestroy();

    expect(component.componentSubscription.unsubscribe).toHaveBeenCalledTimes(
      1
    );
  });

  it("should invoke addConnection in ConnectionService correct form data is passed", () => {
    spyOn(connectionService, "addConnection");

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interset",
      dbc: "1-ABCDE"
    };

    component.gmcNumber = 123456;
    component.updateConnection(formValue);

    expect(component.submitting).toBeTruthy();
    expect(connectionService.addConnection).toHaveBeenCalledWith({
      changeReason: "Conflict of interset",
      designatedBodyCode: "1-ABCDE",
      gmcId: 123456
    });
  });

  it("should invoke removeConnection in ConnectionService correct form data is passed", () => {
    spyOn(connectionService, "removeConnection");

    component.doctorCurrentDbc = "1-ABCDE";
    component.gmcNumber = 123456;
    const formValue = {
      action: ActionType.REMOVE_CONNECTION,
      reason: "Conflict of interset"
    };

    component.updateConnection(formValue);

    expect(component.submitting).toBeTruthy();
    expect(connectionService.removeConnection).toHaveBeenCalledWith({
      changeReason: "Conflict of interset",
      designatedBodyCode: "1-ABCDE",
      gmcId: 123456
    });
  });

  it("should invoke `snackBarService.openSnackBar()` if action is not valid", () => {
    spyOn(snackBarService, "openSnackBar");

    const formValue = {
      action: "UNKNOWN",
      reason: "Conflict of interset"
    };

    component.updateConnection(formValue);

    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      "Please select an action"
    );
  });
});
