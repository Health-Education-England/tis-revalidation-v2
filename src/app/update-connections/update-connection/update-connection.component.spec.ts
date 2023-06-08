import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { NgxsModule, Store } from "@ngxs/store";

import { mockDbcs } from "src/app/reference/mock-data/reference-spec.data";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/shared/material/material.module";
import { UpdateConnectionComponent } from "./update-connection.component";
import { ActionType } from "../update-connections.interfaces";
import { UpdateConnectionsState } from "../state/update-connections.state";
import { UpdateConnectionsService } from "../services/update-connections.service";
import { AuthService } from "src/app/core/auth/auth.service";

describe("UpdateConnectionComponent", () => {
  let component: UpdateConnectionComponent;
  let fixture: ComponentFixture<UpdateConnectionComponent>;
  let store: Store;
  let authService: AuthService;
  let updateConnectionsService: UpdateConnectionsService;
  const actionText = "action";
  const reasonText = "reason";
  const dbcText = "dbc";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        SharedModule,
        NgxsModule.forRoot([UpdateConnectionsState])
      ],
      declarations: [UpdateConnectionComponent],
      providers: [
        AuthService,
        UpdateConnectionsService,
        {
          provide: MatDialog,
          useClass: MdDialogMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    updateConnectionsService = TestBed.inject(UpdateConnectionsService);
    fixture = TestBed.createComponent(UpdateConnectionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();

    authService.userDesignatedBodies = ["1-AIIDWT", "1-AIIDSA", "1-AIIDVS"];
    component.currentDoctorDbcCode = "1-AIIDWT";
    store.reset({
      updateConnections: {
        enableUpdateConnections: true,
        dbcs: mockDbcs
      }
    });
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("form invalid when empty", () => {
    expect(component.updateConnectionForm.valid).toBeFalsy();

    const action = component.updateConnectionForm.controls[actionText];
    expect(action.valid).toBeFalsy();
  });

  it("dbcs and userDbcs should be empty when dbcs$ is null", () => {
    store.reset({
      updateConnections: {
        enableUpdateConnections: true,
        dbcs: null
      }
    });

    expect(component.dbcs.length).toBe(0);
    expect(component.userDbcs.length).toBe(0);
  });

  it("form should add dbc control with user dbcs excluding doctor current dbc when add connection selected", () => {
    component.updateConnectionForm.controls[actionText].setValue(
      ActionType.ADD_CONNECTION
    );

    expect(component.userDbcs.length).toBe(2);

    const dbc = component.updateConnectionForm.controls[dbcText];
    expect(dbc).toBeDefined();
  });

  xit("form should not have reasons when action is not add / remove", () => {
    // NO HIDE CONNECTION YET
    component.updateConnectionForm.controls[actionText].setValue(
      ActionType.HIDE_CONNECTION
    );

    const reason = component.updateConnectionForm.controls[reasonText];
    expect(reason).toBeDefined();
    expect(component.reasons.length).toBe(0);
  });

  it("form should not have dbc control when add connection is not selected", () => {
    component.updateConnectionForm.controls[actionText].setValue(
      ActionType.REMOVE_CONNECTION
    );

    const dbc = component.updateConnectionForm.controls[dbcText];
    expect(dbc).toBeUndefined();
  });

  it("form should get reset when resetForm() invoked", () => {
    expect(component.updateConnectionForm.valid).toBeFalsy();
    fillForm(ActionType.ADD_CONNECTION);

    expect(component.updateConnectionForm.valid).toBeTruthy();

    component.resetForm();
    expect(component.updateConnectionForm.valid).toBeFalsy();
  });

  it("form should emit submittFormEvent when form is submitted", () => {
    spyOn(component.submittFormEvent, "emit");

    expect(component.updateConnectionForm.valid).toBeFalsy();
    fillForm(ActionType.ADD_CONNECTION);
    expect(component.updateConnectionForm.valid).toBeTruthy();
    component.onSubmit();

    expect(component.submittFormEvent.emit).toHaveBeenCalled();
  });

  it("form should not emit submittFormEvent when invalid form is submitted", () => {
    spyOn(component.submittFormEvent, "emit");
    component.onSubmit();

    expect(component.submittFormEvent.emit).not.toHaveBeenCalled();
  });

  it("should invoke enableUpdateConnections when cancel is invoked", () => {
    spyOn(updateConnectionsService, "enableUpdateConnections");
    component.cancel();

    expect(
      updateConnectionsService.enableUpdateConnections
    ).toHaveBeenCalledWith(false);
  });

  function fillForm(action: ActionType) {
    component.updateConnectionForm.controls[actionText].setValue(action);
    component.updateConnectionForm.controls[reasonText].setValue(
      "Conflict of interest"
    );
    if (action === ActionType.ADD_CONNECTION) {
      component.updateConnectionForm.controls[dbcText].setValue("1-ABCDE");
    }
  }
});

export class MdDialogMock {
  open(componentOrTemplateRef: ConfirmDialogComponent) {
    return {
      afterClosed: () => of(true)
    };
  }
}
