import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { TraineesState } from "../state/trainees.state";

import { ResetTraineeListComponent } from "./reset-trainee-list.component";

describe("ResetTraineeListComponent", () => {
  let component: ResetTraineeListComponent;
  let fixture: ComponentFixture<ResetTraineeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetTraineeListComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([TraineesState]),
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetTraineeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
