import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import { ACCEPTED_IMAGE_MIMES } from "../constants";
import { UploadService } from "../services/upload/upload.service";
import { Upload } from "../state/concern.actions";
import { ConcernState } from "../state/concern.state";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.scss"]
})
export class FileUploaderComponent implements OnInit {
  public acceptedFileTypes: string[] = [
    ...ACCEPTED_IMAGE_MIMES,
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "text/csv"
  ];
  public form: FormGroup;
  public gmcNumber: number = this.store.selectSnapshot(ConcernState.gmcNumber);
  @Select(ConcernState.uploadFileInProgress)
  public uploadFileInProgress$: Observable<boolean>;
  @ViewChild("dropArea") dropArea: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private store: Store,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.setupForm();
  }

  public setupForm(): void {
    this.form = this.formBuilder.group({ fileUploader: null });
  }

  public preventDefaults($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  public highlight(): void {
    this.dropArea.nativeElement.classList.add("highlight");
  }

  public unHighlight(): void {
    this.dropArea.nativeElement.classList.remove("highlight");
  }

  public handleDrop($event: DragEvent): void {
    const itemList: DataTransferItem[] = $event.dataTransfer.items
      ? Array.from($event.dataTransfer.items)
      : [];

    this.processFiles(itemList);
  }

  public processFiles(files: any[]): void {
    const processedFiles: File[] = [];
    const invalidFiles: string[] = [];

    if (files.length) {
      files.forEach((i: any) => {
        const file: any = i.name ? i : i.getAsFile();

        if (this.acceptedFileTypes.includes(i.type)) {
          processedFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      });

      if (invalidFiles.length) {
        this.snackBarService.openSnackBar(
          `${invalidFiles.join(", ")} not valid`
        );
        return;
      }

      if (processedFiles.length) {
        this.upload(processedFiles);
      }
    }
  }

  public onFilesSelection($event: Event): void {
    const selectedFiles: File[] = Array.from($event.target[`files`]);
    this.processFiles(selectedFiles);
  }

  public upload(payload: File[]): Observable<any> {
    this.form.reset();
    return this.store.dispatch(new Upload(this.gmcNumber, payload));
  }
}
