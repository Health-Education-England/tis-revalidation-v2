import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick
} from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../shared/material/material.module";
import { ConnectionsComponent } from "./connections.component";
import { UpdateConnectionsService } from "../update-connections/services/update-connections.service";
import { SnackBarService } from "../shared/services/snack-bar/snack-bar.service";
import { ActionType } from "../update-connections/update-connections.interfaces";
import { mockConnectionsResponse } from "./mock-data/connections-spec-data";
import { of, throwError } from "rxjs";
import { RecordsService } from "../records/services/records.service";
import { ConnectionsState } from "./state/connections.state";
import { EnableUpdateConnections } from "../update-connections/state/update-connections.actions";

describe("ConnectionsComponent", () => {
  let component: ConnectionsComponent;
  let fixture: ComponentFixture<ConnectionsComponent>;
  let updateConnectionsService: UpdateConnectionsService;
  let snackBarService: SnackBarService;
  let recordsService: RecordsService;
  let store: Store;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ConnectionsState]),
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [ConnectionsComponent],
      providers: [UpdateConnectionsService, SnackBarService, RecordsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    updateConnectionsService = TestBed.inject(UpdateConnectionsService);
    snackBarService = TestBed.inject(SnackBarService);
    recordsService = TestBed.inject(RecordsService);
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ConnectionsComponent);
    component = fixture.componentInstance;
    recordsService.setConnectionsActions();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should invoke UpdateConnectionService updateConnection method with bulk Add connection", () => {
    spyOn(updateConnectionsService, "updateConnection").and.callThrough();

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interest",
      dbc: "1-FGHIJ"
    };

    component.selectedItems = mockConnectionsResponse.connections;
    component.updateConnections(formValue);

    expect(updateConnectionsService.updateConnection).toHaveBeenCalledWith(
      {
        changeReason: "Conflict of interest",
        designatedBodyCode: "1-FGHIJ",
        doctors: [
          {
            gmcId: "9856987",
            currentDesignatedBodyCode: "1-AIIDWA",
            programmeOwnerDesignatedBodyCode: "1-AIIDWI"
          },
          {
            gmcId: "6589658",
            currentDesignatedBodyCode: "1-AIITWA",
            programmeOwnerDesignatedBodyCode: "1-AIIDVS"
          },
          {
            gmcId: "6589659",
            currentDesignatedBodyCode: "1-AIICWA",
            programmeOwnerDesignatedBodyCode: "1-AIIDNQ"
          },
          {
            gmcId: "6589660",
            currentDesignatedBodyCode: "1-AIIDWA",
            programmeOwnerDesignatedBodyCode: "1-AIIDWA"
          }
        ],
        admin: ""
      },
      ActionType.ADD_CONNECTION
    );
    expect(component.loading).toBeTruthy();
  });

  it("should display snackbar success message and set loading to false when bulk Add connection request succeeds", fakeAsync(() => {
    const message = "Connections updated!";
    spyOn(snackBarService, "openSnackBar");
    spyOn(component, "onCompleteUpdate").and.callThrough();
    spyOn(updateConnectionsService, "updateConnection").and.returnValue(
      of({ message })
    );
    spyOn(recordsService, "enableAllocateAdmin").and.returnValue(of(false));
    spyOn(recordsService, "get").and.returnValue(of([]));

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interest",
      dbc: "1-FGHIJ"
    };

    component.selectedItems = mockConnectionsResponse.connections;
    component.updateConnections(formValue);
    tick(500);
    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(message);
    expect(component.onCompleteUpdate).toHaveBeenCalled();
    expect(component.loading).toBeFalsy();
    flush();
  }));

  it("should display snackbar error message when bulk Add connection request fails", fakeAsync(() => {
    const message = "Request failed";
    spyOn(snackBarService, "openSnackBar");
    spyOn(component, "onCompleteUpdate");
    spyOn(updateConnectionsService, "updateConnection").and.returnValue(
      throwError(() => new Error(message))
    );

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interest",
      dbc: "1-FGHIJ"
    };

    component.selectedItems = mockConnectionsResponse.connections;
    component.updateConnections(formValue);
    tick();

    expect(component.onCompleteUpdate).toHaveBeenCalled();
    expect(component.loading).toBeTruthy();
    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(message);
    flush();
  }));

  it("should dispatch EnableUpdateConnections action as false after update connection completes", fakeAsync(() => {
    spyOn(store, "dispatch");
    spyOn(updateConnectionsService, "updateConnection").and.returnValue(
      of({ message: "Connections updated!" })
    );

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interest",
      dbc: "1-FGHIJ"
    };

    component.selectedItems = mockConnectionsResponse.connections;
    component.updateConnections(formValue);
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(
      new EnableUpdateConnections(false)
    );
    flush();
  }));

  it("should dispatch EnableUpdateConnections action as false after update connection errors", fakeAsync(() => {
    spyOn(store, "dispatch");
    spyOn(updateConnectionsService, "updateConnection").and.returnValue(
      throwError(() => new Error("New error message"))
    );

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interest",
      dbc: "1-FGHIJ"
    };

    component.selectedItems = mockConnectionsResponse.connections;
    component.updateConnections(formValue);
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(
      new EnableUpdateConnections(false)
    );
    flush();
  }));

  it("should display snackbar to prompt user to select doctors if no doctors selected", () => {
    spyOn(updateConnectionsService, "updateConnection").and.callThrough();
    spyOn(snackBarService, "openSnackBar");

    const formValue = {
      action: ActionType.ADD_CONNECTION,
      reason: "Conflict of interest",
      dbc: "1-FGHIJ"
    };

    component.selectedItems = [];

    component.updateConnections(formValue);

    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      "Please select doctors to update connections"
    );
  });
});
