import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NotesToolBarComponent } from "./notes-tool-bar.component";
import { MaterialModule } from "../../material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("NotesToolBarComponent", () => {
  let component: NotesToolBarComponent;
  let fixture: ComponentFixture<NotesToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
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
