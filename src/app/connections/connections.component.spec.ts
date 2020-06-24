import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConnectionsComponent } from "./connections.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TraineesService } from "../shared/trainees/trainees.service";
import { NgxsModule } from "@ngxs/store";
import { ConnectionsState } from "./state/connections.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ConnectionsComponent", () => {
  let component: ConnectionsComponent;
  let fixture: ComponentFixture<ConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([ConnectionsState]),
        HttpClientTestingModule
      ],
      declarations: [ConnectionsComponent],
      providers: [TraineesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
