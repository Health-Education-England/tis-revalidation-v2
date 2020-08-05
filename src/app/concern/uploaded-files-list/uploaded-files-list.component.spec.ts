import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { DeleteFile, DownloadFile, ListFiles } from "../state/concern.actions";
import { ConcernState } from "../state/concern.state";

import { UploadedFilesListComponent } from "./uploaded-files-list.component";

describe("UploadedFilesListComponent", () => {
  let store: Store;
  let component: UploadedFilesListComponent;
  let fixture: ComponentFixture<UploadedFilesListComponent>;
  const mockFileName = "mockfile.txt";
  const mockKey = "119389/8119389/mockfile.txt";

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
    store.reset({ concern: { gmcNumber: 8140126 } });
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
    component.downloadFile(mockFileName, mockKey);
    expect(store.dispatch).toHaveBeenCalledWith(
      new DownloadFile(mockFileName, mockKey)
    );
  });

  it("deleteFile() should dispatch event", () => {
    spyOn(store, "dispatch");
    component.deleteFile(mockFileName, mockKey);
    expect(store.dispatch).toHaveBeenCalledWith(
      new DeleteFile(mockFileName, mockKey)
    );
  });

  it("deleteFile() should dispatch event", () => {
    spyOn(store, "dispatch");
    component.listFiles();
    expect(store.dispatch).toHaveBeenCalledWith(
      new ListFiles(8140126, 8140126)
    );
  });
});
