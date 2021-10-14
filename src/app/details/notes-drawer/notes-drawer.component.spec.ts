import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { NotesDrawerComponent } from "./notes-drawer.component";
import { NgxsModule } from "@ngxs/store";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NotesDrawerState } from "./state/notes-drawer.state";
import { DetailsSideNavState } from "../details-side-nav/state/details-side-nav.state";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

describe("NoteCardComponent", () => {
  let component: NotesDrawerComponent;
  let fixture: ComponentFixture<NotesDrawerComponent>;
  const activatedRoute = {
    snapshot: { params: { gmcNumber: 0 } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        NgxsModule.forRoot([NotesDrawerState, DetailsSideNavState]),
        HttpClientTestingModule,
        RouterTestingModule,
        CommonModule
      ],
      declarations: [NotesDrawerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
