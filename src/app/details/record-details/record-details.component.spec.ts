import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MaterialModule } from "../../shared/material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RecordDetailsComponent } from "./record-details.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { NotesDrawerState } from "../notes-drawer/state/notes-drawer.state";
describe("RecordDetailsComponent", () => {
  let component: RecordDetailsComponent;
  let fixture: ComponentFixture<RecordDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecordDetailsComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([NotesDrawerState])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
