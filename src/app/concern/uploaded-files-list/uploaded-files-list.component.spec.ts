import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { DownloadFile } from "../state/concern.actions";
import { ConcernState } from "../state/concern.state";

import { UploadedFilesListComponent } from "./uploaded-files-list.component";

describe("UploadedFilesListComponent", () => {
  let store: Store;
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
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedFilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("ngOnInit() should invoke `listFiles()`", () => {
    spyOn(component, "listFiles");
    component.ngOnInit();
    expect(component.listFiles).toHaveBeenCalled();
  });

  it("downloadFile() should dispatch event", () => {
    spyOn(store, "dispatch");
    const mockFileName = "mockfile.txt";
    const mockKey = "119389/8119389/mockfile.txt";

    component.downloadFile(mockFileName, mockKey);
    expect(store.dispatch).toHaveBeenCalledWith(
      new DownloadFile(mockFileName, mockKey)
    );
  });
});
