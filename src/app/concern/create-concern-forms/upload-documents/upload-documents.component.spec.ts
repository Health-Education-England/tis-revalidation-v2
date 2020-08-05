import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UploadDocumentsComponent } from "./upload-documents.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CommentsService } from "../../../details/comments-tool-bar/comments.service";

describe("UploadDocumentsComponent", () => {
  let component: UploadDocumentsComponent;
  let fixture: ComponentFixture<UploadDocumentsComponent>;
  let commentsService: CommentsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDocumentsComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [CommentsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocumentsComponent);
    component = fixture.componentInstance;
    commentsService = TestBed.inject(CommentsService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
