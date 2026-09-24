import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ToolBarComponent } from "./tool-bar.component";
import { NgxsModule, Store } from "@ngxs/store";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotesDrawerState } from "../notes-drawer/state/notes-drawer.state";
import { DetailsSideNavState } from "../details-side-nav/state/details-side-nav.state";

import { provideHttpClientTesting } from "@angular/common/http/testing";
import {
  provideHttpClient,
  withInterceptorsFromDi
} from "@angular/common/http";

describe("NoteCardComponent", () => {
  let component: ToolBarComponent;
  let fixture: ComponentFixture<ToolBarComponent>;
  let store: Store;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        NgxsModule.forRoot([NotesDrawerState, DetailsSideNavState]),
        CommonModule
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      traineeDetails: {
        item: {
          gmcNumber: 123456,
          forenames: "Bob",
          surname: "Fossil",
          curriculumEndDate: "2021-11-11",
          programmeMembershipType: "Zoo Keeper",
          programmeName: "Big Cats",
          currentGrade: "Junior",
          tisPersonId: "123",
          notes: [
            { gmcId: 123456, text: "Example note" },
            { gmcId: 123456, text: "Second example note" },
            { gmcId: 123456, text: "Third example note" }
          ]
        }
      },
      notesDrawer: {
        isOpen: false
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display 'show notes' when  isOpen is false", () => {
    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    const el = nativeElement.querySelector("[data-testid='button-show-notes']");
    expect(el).toBeTruthy();
  });

  it("should display 'hide notes' when drawer is open", () => {
    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    const button = nativeElement.querySelector("button.toggle-drawer");
    button.click();
    fixture.detectChanges();
    const el = nativeElement.querySelector("[data-testid='button-hide-notes']");
    expect(el).toBeTruthy();
  });

  it("should display the number of notes in the icon badge", () => {
    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    const el = nativeElement.querySelector(".mat-badge-content");
    expect(el.innerText).toContain("3");
  });

  it("should display '' in the icon badge when no notes", () => {
    store.reset({
      ...store.snapshot(),
      traineeDetails: {
        item: {
          notes: [{ gmcId: 123456, text: "hello" }]
        }
      }
    });
    fixture.detectChanges();

    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    const el = nativeElement.querySelector(".mat-badge-content");
    expect(el.innerText).toContain("");
  });
});
