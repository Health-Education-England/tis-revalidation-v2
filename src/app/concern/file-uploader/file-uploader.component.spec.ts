import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import { Upload, SetSelectedConcern } from "../state/concern.actions";
import { ConcernState } from "../state/concern.state";
import { FileUploaderComponent } from "./file-uploader.component";
import { defaultConcern } from "../constants";

describe("FileUploaderComponent", () => {
  let store: Store;
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;
  let snackBarService: SnackBarService;
  const mockConcernId = 8119389;
  const createFile = (
    filename: string,
    filetype: string,
    fileKBsize: number
  ): File => {
    const newfile = new File([""], filename, { type: filetype });
    Object.defineProperty(newfile, "size", {
      value: 1024 * fileKBsize,
      writable: false
    });
    return newfile;
  };

  const createMokEvent = (mockFile: File) => {
    const mockEvt = {
      dataTransfer: {
        items: [
          {
            type: mockFile.type,
            size: mockFile.size,
            getAsFile: () => mockFile
          }
        ]
      }
    };
    return mockEvt;
  };

  const MockTextFile = createFile("mockfile.txt", "text/plain", 1);
  const MockZipFile = createFile("mockfile.zip", "application/zip", 1);

  const setDefaultSelectedConcern = () => {
    store.dispatch(
      new SetSelectedConcern({
        ...defaultConcern,
        ...{ concernId: mockConcernId }
      })
    );
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([ConcernState])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
    snackBarService = TestBed.inject(SnackBarService);
    store.reset({ concern: { gmcNumber: 8119389 } });
    setDefaultSelectedConcern();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("ngOnInit() should invoke `setupForm()`", () => {
    spyOn(component, "setupForm");
    component.ngOnInit();
    expect(component.setupForm).toHaveBeenCalled();
  });

  it("preventDefaults() should stop propagation and prevent default event`", () => {
    const $event: MouseEvent = new MouseEvent("drag", {
      bubbles: true,
      cancelable: true
    });

    spyOn($event, "preventDefault");
    spyOn($event, "stopPropagation");

    component.preventDefaults($event);

    expect($event.preventDefault).toHaveBeenCalled();
    expect($event.stopPropagation).toHaveBeenCalled();
  });

  it("highlight() should add 'highlight' class", () => {
    const dropArea: Element = component.dropArea.nativeElement;
    component.highlight();
    expect(dropArea.classList.contains("highlight")).toBeTrue();
  });

  it("unHighlight() should remove 'highlight' class", () => {
    const dropArea: Element = component.dropArea.nativeElement;
    component.unHighlight();
    expect(dropArea.classList.contains("highlight")).toBeFalse();
  });

  it("handleDrop() should invoke `processFiles()`", () => {
    spyOn(component, "processFiles");

    const mockFile = MockTextFile;
    const mockEvt = createMokEvent(mockFile);

    component.handleDrop(mockEvt as any);
    expect(component.processFiles).toHaveBeenCalled();
  });

  it("processFiles() should invoke `upload()` if valid files have been dropped", () => {
    spyOn(component, "upload");

    const mockFile = MockTextFile;
    const mockEvt = createMokEvent(mockFile);

    component.handleDrop(mockEvt as any);
    expect(component.upload).toHaveBeenCalledWith([mockFile]);
  });

  it("processFiles() should invoke `snackBarService.openSnackBar()` if invalid files have been dropped", () => {
    spyOn(snackBarService, "openSnackBar");

    const mockFile = MockZipFile;

    const mockEvt = createMokEvent(mockFile);

    component.handleDrop(mockEvt as any);
    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      `${mockFile.name} not valid`
    );
  });

  it("onFilesSelection() should invoke `processFiles()`", () => {
    spyOn(component, "processFiles");

    const mockFile = MockTextFile;
    const mockEvt = { target: { files: [mockFile] } };

    component.onFilesSelection(mockEvt as any);
    expect(component.processFiles).toHaveBeenCalledWith([mockFile]);
  });

  it("upload() should reset form", () => {
    spyOn(component.form, "reset");
    component.upload([]);
    expect(component.form.reset).toHaveBeenCalled();
  });

  it("upload() should dispatch `Upload` event", () => {
    spyOn(store, "dispatch");
    component.upload([]);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Upload(8119389, mockConcernId, [])
    );
  });
});
