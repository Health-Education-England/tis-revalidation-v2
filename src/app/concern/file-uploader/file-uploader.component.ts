import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import { IConcernSummary, IFileUploadProgress } from "../concern.interfaces";
import { ACCEPTED_IMAGE_MIMES } from "../constants";
import { ConcernState } from "../state/concern.state";
import { Upload } from "../state/concern.actions";
import { take, filter } from "rxjs/operators";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.scss"]
})
export class FileUploaderComponent implements OnInit, OnDestroy {
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
  public acceptedFileSize = 10485760;
  public form: FormGroup;
  public gmcNumber: number = this.store.selectSnapshot(ConcernState.gmcNumber);
  public concernId?: string;
  @Select(ConcernState.uploadFileInProgress)
  public uploadFileInProgress$: Observable<boolean>;
  @Select(ConcernState.filesInUploadProgress)
  public filesInUploadProgress$: Observable<IFileUploadProgress[]>;
  @Select(ConcernState.selected)
  selectedConcern$: Observable<IConcernSummary>;
  @ViewChild("dropArea") dropArea: ElementRef;
  subsciptions: Subscription[] = [];

  constructor(private store: Store, private snackBarService: SnackBarService) {}

  ngOnDestroy(): void {
    this.destroyPendingFiles();
    this.subsciptions.forEach((subscribed: Subscription) => {
      if (subscribed.closed === false) {
        subscribed.unsubscribe();
      }
    });
  }

  ngOnInit() {
    this.setupForm();
    this.setConcernId();
  }

  public setupForm(): void {
    this.form = new FormGroup({ fileUploader: new FormControl("") });
  }

  /**
   * subscribe to each concern change and upload files automatically if files are in progress
   */
  public setConcernId(): void {
    this.subsciptions.push(
      this.selectedConcern$
        .pipe(
          filter(
            (_concern: IConcernSummary) => _concern.concernId !== this.concernId
          )
        )
        .subscribe((selectedConcern: IConcernSummary) => {
          this.concernId = selectedConcern.concernId;
          const filesInProgress = this.store.selectSnapshot(
            ConcernState.filesInUploadProgress
          );
          if (
            this.concernId &&
            filesInProgress &&
            filesInProgress?.length > 0
          ) {
            const files = filesInProgress.map(
              (val: IFileUploadProgress) => val.file
            );
            this.upload(files);
          }
        })
    );
  }

  public upload(payload: File[]): void {
    this.store
      .dispatch(new Upload(this.gmcNumber, this.concernId, payload))
      .subscribe(() => {
        this.setupForm();
      });
  }

  // TODO check if needed why?
  public destroyPendingFiles() {
    const filesInProgress = this.store.selectSnapshot(
      ConcernState.filesInUploadProgress
    );
    if (filesInProgress?.length > 0) {
      filesInProgress.map((val: IFileUploadProgress) => {
        const file = val.file;
        this.removeProgressFile(file);
      });
    }
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
    const itemList: File[] = $event.dataTransfer.files
      ? Array.from($event.dataTransfer.files)
      : [];

    this.processFiles(itemList);
  }

  public processFiles(files: File[]): void {
    const processedFiles: File[] = [];
    const invalidFiles: string[] = [];
    files.forEach((file: File) => {
      if (
        this.acceptedFileTypes.includes(file.type) &&
        file.size < this.acceptedFileSize
      ) {
        processedFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length) {
      this.snackBarService.openSnackBar(`${invalidFiles.join(", ")} not valid`);
      return;
    }

    if (processedFiles.length) {
      this.upload(processedFiles);
    }
  }

  public onFilesSelection($event: Event): void {
    const selectedFiles: File[] = Array.from($event.target[`files`]);
    this.processFiles(selectedFiles);
  }

  public removeProgressFile(file: File) {
    const filesInProgress = this.store.selectSnapshot(
      ConcernState.filesInUploadProgress
    );
    const files = filesInProgress
      .filter((val: IFileUploadProgress) => val.file !== file)
      .map((val: IFileUploadProgress) => val.file);
    this.upload(files);
  }
}
