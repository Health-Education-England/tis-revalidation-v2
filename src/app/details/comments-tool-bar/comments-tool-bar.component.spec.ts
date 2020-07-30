import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CommentsToolBarComponent } from "./comments-tool-bar.component";
import { MaterialModule } from "../../shared/material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("CommentsToolBarComponent", () => {
  let component: CommentsToolBarComponent;
  let fixture: ComponentFixture<CommentsToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      declarations: [CommentsToolBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
