import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import { UploadService } from "../services/upload/upload.service";
import { Upload } from "../state/concern.actions";
import { ConcernState } from "../state/concern.state";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.scss"]
})
export class FileUploaderComponent implements OnInit {
  public acceptedFileTypes = `image/apng,image/bmp,image/gif,image/jpeg,image/png,image/svg+xml,image/tiff,image/webp,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/csv`;
  public form: FormGroup;
  public gmcNumber: number = this.store.selectSnapshot(ConcernState.gmcNumber);
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

  public preventDefaults(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

  public highlight(): void {
    this.dropArea.nativeElement.classList.add("highlight");
  }

  public unhighlight(): void {
    this.dropArea.nativeElement.classList.remove("highlight");
  }

  public handleDrop($event: DragEvent): void {
    const itemList: DataTransferItem[] = Array.from($event.dataTransfer.items);
    const filesAllowed: string[] = this.acceptedFileTypes.split(",");
    const droppedFiles: File[] = [];
    const invalidFiles: string[] = [];

    if (itemList && itemList.length) {
      // TODO remove check once multiple file upload is supported by BE
      if (itemList.length > 1) {
        this.snackBarService.openSnackBar(`Please select one file at a time`);
        return;
      }

      itemList.forEach((i: DataTransferItem) => {
        if (filesAllowed.includes(i.type)) {
          droppedFiles.push(i.getAsFile());
        } else {
          invalidFiles.push(i.getAsFile().name);
        }
      });

      if (invalidFiles.length) {
        this.snackBarService.openSnackBar(
          `${invalidFiles.join(", ")} not valid`
        );
        return;
      }

      if (droppedFiles.length) {
        this.upload(droppedFiles);
      }
    }
  }

  public onFilesSelection($event: Event): void {
    const selectedFiles: File[] = Array.from($event.target[`files`]);
    this.upload(selectedFiles);
  }

  public upload(payload: File[]): Observable<any> {
    return this.store.dispatch(new Upload(this.gmcNumber, payload));
  }
}
