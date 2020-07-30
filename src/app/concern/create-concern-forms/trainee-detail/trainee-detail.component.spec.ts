import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";
import { AdminsState } from "../../../admins/state/admins.state";
import { MaterialModule } from "../../../shared/material/material.module";
import { ConcernState } from "../../state/concern.state";

import { TraineeDetailComponent } from "./trainee-detail.component";

fdescribe("TraineeDetailComponent", () => {
  let component: TraineeDetailComponent;
  let fixture: ComponentFixture<TraineeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeDetailComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([ConcernState, AdminsState])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
