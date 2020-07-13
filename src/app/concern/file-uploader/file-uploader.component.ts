import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UploadService } from "../services/upload/upload.service";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.scss"]
})
export class FileUploaderComponent implements OnInit {
  public acceptedFileTypes = `image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/csv`;
  public form: FormGroup;
  @ViewChild("dropArea") dropArea: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService
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

  public handleDrop(e: any): void {
    // const dt = e.dataTransfer;
    // this.uploadedFiles = dt.files;
    this.upload();
  }

  public onFilesSelection(element: any): void {
    // this.uploadedFiles = element.target.files;
    this.upload();
  }

  // TODO: plug endpoint and show message on success / failure
  upload() {
    // const formData = new FormData();
    // const filesAllowed = this.acceptedFileTypes.split(",");
    // Array.from(this.uploadedFiles).forEach((uploadedFile: File) => {
    //   if (filesAllowed.includes(uploadedFile.type)) {
    //     formData.append("uploads[]", uploadedFile, uploadedFile.name);
    //   } else {
    //     // add filetype to array and inform user of not allowed types
    //   }
    // });
    // (window as any).alert("Your upload should resume by next sprint 😀");
    // this.uploadService.upload(formData).subscribe(() => {
    //
    // });
  }
}
