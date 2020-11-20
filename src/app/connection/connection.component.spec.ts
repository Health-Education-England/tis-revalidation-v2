import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../shared/material/material.module";
import { ConnectionState } from "../connection/state/connection.state";
import { ConnectionComponent } from "./connection.component";
import { mockConnectionResponse } from "./mock-data/conneciton-details-spec-data";
import { ConnectionActions } from "./constants";
import { of } from "rxjs";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialog } from "@angular/material/dialog";

describe("ConnectionComponent", () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;
  const actionText = "action";
  const reasonText = "reason";
  const dbcText = "dbc";

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
      declarations: [ConnectionComponent],
      providers: [
        {
          provide: MatDialog,
          useClass: MdDialogMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
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
    component.dbcs = mockConnectionResponse.dbcs;
    expect(component.getDBCAbbrevation("1-AIIDSA")).toBe("HEEM");
  });

  it("should return dbc code when getDBCAbbrevation is called with unavailable dbc code", () => {
    component.dbcs = mockConnectionResponse.dbcs;
    expect(component.getDBCAbbrevation("1-RANDOM")).toBe("1-RANDOM");
  });

  it("form invalid when empty", () => {
    expect(component.updateConnectionForm.valid).toBeFalsy();

    const action = component.updateConnectionForm.controls[actionText];
    expect(action.valid).toBeFalsy();
  });

  it("form should add reason control when any action selected", () => {
    component.updateConnectionForm.controls[actionText].setValue(
      ConnectionActions.ADD_CONNECTION
    );

    const reason = component.updateConnectionForm.controls[reasonText];
    expect(reason).toBeDefined();
  });

  it("form should add dbc control when add connection selected", () => {
    component.updateConnectionForm.controls[actionText].setValue(
      ConnectionActions.ADD_CONNECTION
    );

    const dbc = component.updateConnectionForm.controls[dbcText];
    expect(dbc).toBeDefined();
  });

  it("form should not have dbc control when add connection is not selected", () => {
    component.updateConnectionForm.controls[actionText].setValue(
      ConnectionActions.REMOVE_CONNECTION
    );

    const dbc = component.updateConnectionForm.controls[dbcText];
    expect(dbc).toBeUndefined();
  });

  it("form should get reset when resetForm() invoked", () => {
    expect(component.updateConnectionForm.valid).toBeFalsy();
    fillForm();

    expect(component.updateConnectionForm.valid).toBeTruthy();

    component.resetForm();
    expect(component.updateConnectionForm.valid).toBeFalsy();
  });

  it("form should invoke updateConnection() when add conneciton action selected", () => {
    expect(component.updateConnectionForm.valid).toBeFalsy();
    fillForm();
    expect(component.updateConnectionForm.valid).toBeTruthy();
    component.openDialog();
  });

  it("form should invoke updateConnection() when remove conneciton action selected", () => {
    expect(component.updateConnectionForm.valid).toBeFalsy();
    fillForm(ConnectionActions.REMOVE_CONNECTION);
    expect(component.updateConnectionForm.valid).toBeTruthy();
    component.openDialog();
  });

  it("form should invoke updateConnection() when review conneciton action selected", () => {
    expect(component.updateConnectionForm.valid).toBeFalsy();
    fillForm(ConnectionActions.REVIEW_CONNECTION);
    expect(component.updateConnectionForm.valid).toBeTruthy();
    component.openDialog();
  });

  it("form should invoke updateConnection() when ignore conneciton action selected", () => {
    expect(component.updateConnectionForm.valid).toBeFalsy();
    fillForm(ConnectionActions.IGNORE_CONNECTION);
    expect(component.updateConnectionForm.valid).toBeTruthy();
    component.openDialog();
  });

  function fillForm(
    action: ConnectionActions = ConnectionActions.ADD_CONNECTION
  ) {
    component.updateConnectionForm.controls[actionText].setValue(action);
    component.updateConnectionForm.controls[reasonText].setValue(
      "Conflict of interest"
    );
    if (action === ConnectionActions.ADD_CONNECTION) {
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
