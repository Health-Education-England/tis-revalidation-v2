import { provideHttpClientTesting } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import {
  DeleteFile,
  DownloadFile,
  ListFiles,
  SetSelectedConcern
} from "../state/concern.actions";
import { ConcernState } from "../state/concern.state";

import { UploadedFilesListComponent } from "./uploaded-files-list.component";
import { defaultConcern } from "../constants";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("UploadedFilesListComponent", () => {
  let store: Store;
  let component: UploadedFilesListComponent;
  let fixture: ComponentFixture<UploadedFilesListComponent>;
  const _gmcNumber = 8140126;
  const _concernId = "xxxxxx-yyyyy-zzzzz";
  const mockFileName = "mockfile.txt";
  const mockKey = `${_gmcNumber}/${_concernId}/mockfile.txt`;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [UploadedFilesListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [MaterialModule,
        NgxsModule.forRoot([ConcernState])],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
    store = TestBed.inject(Store);
    store.reset({ concern: { gmcNumber: _gmcNumber } });
    store.dispatch(
      new SetSelectedConcern({
        ...defaultConcern,
        ...{ concernId: _concernId }
      })
    );
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
      new ListFiles(_gmcNumber, _concernId)
    );
  });
});
