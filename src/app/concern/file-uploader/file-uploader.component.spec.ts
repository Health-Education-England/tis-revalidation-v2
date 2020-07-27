import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import { Upload } from "../state/concern.actions";
import { ConcernState } from "../state/concern.state";
import { FileUploaderComponent } from "./file-uploader.component";

describe("FileUploaderComponent", () => {
  let store: Store;
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;
  let snackBarService: SnackBarService;

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

    const mockFile = new File([""], "mockfile.txt", { type: "text/plain" });
    const mockEvt = {
      dataTransfer: {
        items: [{ type: mockFile.type, getAsFile: () => mockFile }]
      }
    };

    component.handleDrop(mockEvt as any);
    expect(component.processFiles).toHaveBeenCalled();
  });

  it("processFiles() should invoke `upload()` if valid files have been dropped", () => {
    spyOn(component, "upload");

    const mockFile = new File([""], "mockfile.txt", { type: "text/plain" });
    const mockEvt = {
      dataTransfer: {
        items: [{ type: mockFile.type, getAsFile: () => mockFile }]
      }
    };

    component.handleDrop(mockEvt as any);
    expect(component.upload).toHaveBeenCalledWith([mockFile]);
  });

  it("processFiles() should invoke `snackBarService.openSnackBar()` if invalid files have been dropped", () => {
    spyOn(snackBarService, "openSnackBar");

    const mockFile = new File([""], "mockfile.zip", {
      type: "application/zip"
    });
    const mockEvt = {
      dataTransfer: {
        items: [{ type: mockFile.type, getAsFile: () => mockFile }]
      }
    };

    component.handleDrop(mockEvt as any);
    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      `${mockFile.name} not valid`
    );
  });

  it("onFilesSelection() should invoke `processFiles()`", () => {
    spyOn(component, "processFiles");

    const mockFile = new File([""], "filename", { type: "text/html" });
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
    expect(store.dispatch).toHaveBeenCalledWith(new Upload(8119389, []));
  });
});
