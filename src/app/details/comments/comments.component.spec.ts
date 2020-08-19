import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { CommentsComponent } from "./comments.component";

describe("CommentsComponent", () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
