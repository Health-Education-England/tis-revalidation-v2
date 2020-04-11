import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TraineesComponent } from "./trainees.component";
import { NgxsModule } from "@ngxs/store";
import { TraineesState } from "./state/trainees.state";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../shared/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("TraineesComponent", () => {
  let component: TraineesComponent;
  let fixture: ComponentFixture<TraineesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([TraineesState])
      ],
      declarations: [TraineesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
