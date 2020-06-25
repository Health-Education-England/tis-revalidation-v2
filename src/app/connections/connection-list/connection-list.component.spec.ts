import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { ConnectionsState } from "../state/connections.state";
import { ConnectionListComponent } from "./connection-list.component";

describe("ConnectionListComponent", () => {
  let component: ConnectionListComponent;
  let fixture: ComponentFixture<ConnectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([ConnectionsState])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
