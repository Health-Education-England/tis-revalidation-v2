import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TraineesPaginatorComponent } from "./trainees-paginator.component";
import { TraineesService } from "../trainees.service";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../../material/material.module";

describe("TraineesPaginatorComponent", () => {
  let component: TraineesPaginatorComponent;
  let fixture: ComponentFixture<TraineesPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      declarations: [TraineesPaginatorComponent],
      providers: [TraineesService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineesPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
