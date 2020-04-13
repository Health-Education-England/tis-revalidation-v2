import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TraineesListComponent } from "./trainees-list.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { of } from "rxjs";
import { traineesResponse1 } from "../spec-data/spec.trainees";

describe("TraineesListComponent", () => {
  let component: TraineesListComponent;
  let fixture: ComponentFixture<TraineesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [TraineesListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ store: traineesResponse1 })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
