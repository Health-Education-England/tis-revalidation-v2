import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TraineesListComponent } from "./trainees-list.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

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
            snapshot: {
              data: {
                store: {
                  doctors: {
                    items: [],
                    params: {},
                    countUnderNotice: 0,
                    countTotal: 0
                  }
                }
              }
            }
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
