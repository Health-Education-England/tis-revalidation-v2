import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TraineeDetailsComponent } from "./trainee-details.component";
import { NgxsModule } from "@ngxs/store";
import { RevalidationHistoryState } from "../state/revalidation-history.state";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("TraineeDetailsComponent", () => {
  let component: TraineeDetailsComponent;
  let fixture: ComponentFixture<TraineeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([RevalidationHistoryState])
      ],
      declarations: [TraineeDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
