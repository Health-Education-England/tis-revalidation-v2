import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { ConcernState } from "../state/concern.state";

import { UploadedFilesListComponent } from "./uploaded-files-list.component";

describe("UploadedFilesListComponent", () => {
  let component: UploadedFilesListComponent;
  let fixture: ComponentFixture<UploadedFilesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadedFilesListComponent],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([ConcernState])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedFilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
