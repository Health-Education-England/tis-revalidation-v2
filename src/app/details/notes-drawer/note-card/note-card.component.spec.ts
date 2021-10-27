import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoteCardComponent } from "./note-card.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/material/material.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { INote } from "../notes-drawer.interfaces";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgxsModule } from "@ngxs/store";

describe("NoteCardComponent", () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  let note: INote;
  const noteText = "This is an eample note text";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        CommonModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([])
      ],
      declarations: [NoteCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;
    note = { gmcId: 123456, text: noteText, updatedDate: new Date() };
    component.note = note;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should display note text", () => {
    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    component.isAdmin = true;
    fixture.detectChanges();
    const el = nativeElement.querySelector("mat-card-content");
    expect(el.innerText).toContain(noteText);
  });

  it("should display actions when isAdmin", () => {
    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    component.isAdmin = true;
    fixture.detectChanges();
    const el = nativeElement.querySelector("mat-card-actions");
    expect(el).toBeTruthy();
  });

  it("should NOT display actions when not isAdmin", () => {
    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    component.isAdmin = false;
    fixture.detectChanges();
    const el = nativeElement.querySelector("mat-card-actions");
    expect(el).toBeFalsy();
  });
});
