import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from "rxjs";

import { MaterialModule } from "../shared/material/material.module";
import { ConnectionState } from "../connection/state/connection.state";
import { ConnectionComponent } from "./connection.component";
import { mockDbcs } from "../reference/mock-data/reference-spec.data";
import { ConnectionService } from "./services/connection.service";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import { ActionType } from "../update-connections/update-connections.interfaces";

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
        FormsModule
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

  it("should return dbc abbrevation when getDBCAbbrevation is called with dbc code", () => {
    component.dbcs = mockDbcs;
    expect(component.getDBCAbbrevation("1-AIIDSA")).toBe("HEEM");
  });

  it("should return dbc code when getDBCAbbrevation is called with unavailable dbc code", () => {
    component.dbcs = mockDbcs;
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
    spyOn(connectionService, "updateConnection").and.callThrough();

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interset",
      dbc: "1-FGHIJ"
    };

    component.doctorCurrentDbc = "1-ABCDE";
    component.gmcNumber = 123456;
    component.updateConnection(formValue);

    expect(component.submitting).toBeTruthy();
    expect(connectionService.updateConnection).toHaveBeenCalledWith(
      {
        changeReason: "Conflict of interset",
        designatedBodyCode: "1-FGHIJ",
        doctors: [{ gmcId: 123456, currentDesignatedBodyCode: "1-ABCDE" }]
      },
      "add"
    );
  });

  it("should invoke removeConnection in ConnectionService correct form data is passed", () => {
    spyOn(connectionService, "updateConnection").and.callThrough();

    const formValue = {
      action: ActionType.REMOVE_CONNECTION,
      reason: "Conflict of interset"
    };

    component.doctorCurrentDbc = "1-ABCDE";
    component.gmcNumber = 123456;
    component.updateConnection(formValue);

    expect(component.submitting).toBeTruthy();
    expect(connectionService.updateConnection).toHaveBeenCalledWith(
      {
        changeReason: "Conflict of interset",
        designatedBodyCode: null,
        doctors: [{ gmcId: 123456, currentDesignatedBodyCode: "1-ABCDE" }]
      },
      "remove"
    );
  });
});
