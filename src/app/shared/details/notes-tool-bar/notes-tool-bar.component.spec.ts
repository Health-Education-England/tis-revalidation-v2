import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";
import { RecommendationNotesState } from "../../../recommendation/state/recommendation-notes.state";
import { MaterialModule } from "../../material/material.module";

import { NotesToolBarComponent } from "./notes-tool-bar.component";

describe("NotesToolBarComponent", () => {
  let component: NotesToolBarComponent;
  let fixture: ComponentFixture<NotesToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([RecommendationNotesState])
      ],
      declarations: [NotesToolBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
