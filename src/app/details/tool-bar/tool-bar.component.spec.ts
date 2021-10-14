import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ToolBarComponent } from "./tool-bar.component";
import { NgxsModule } from "@ngxs/store";
import { Store } from "@ngxs/store";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotesDrawerState } from "../notes-drawer/state/notes-drawer.state";
import { ToggleDrawer } from "../notes-drawer/state/notes-drawer.actions";
import { DetailsSideNavState } from "../details-side-nav/state/details-side-nav.state";

import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("NoteCardComponent", () => {
  let component: ToolBarComponent;
  let fixture: ComponentFixture<ToolBarComponent>;
  let store: Store;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([NotesDrawerState, DetailsSideNavState]),
        CommonModule
      ],
      declarations: [ToolBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    store.reset({
      traineeDetails: {
        item: {
          gmcNumber: 123456,
          forenames: "Bob",
          surname: "Fossil",
          cctDate: "2021-11-11",
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

  it("should display 'speaker_notes' mat-icon by default", async(() => {
    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    let el = nativeElement.querySelector(".note-icon-open");
    fixture.detectChanges();
    expect(el).toBeTruthy();
  }));

  it("should display 'speaker_notes_OFF' mat-icon when drawer is open", async(() => {
    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    let button = nativeElement.querySelector("button.toggle-drawer");
    button.click();
    fixture.detectChanges();
    let el = nativeElement.querySelector(".note-icon-close");
    expect(el).toBeTruthy();
  }));

  it("should display the number of notes in the icon badge", async(() => {
    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    let el = nativeElement.querySelector(".mat-badge-content");
    expect(el.innerText).toContain("3");
  }));

  it("should display '' in the icon badge when no notes", async(() => {
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
    let el = nativeElement.querySelector(".mat-badge-content");
    expect(el.innerText).toContain("");
  }));
});
