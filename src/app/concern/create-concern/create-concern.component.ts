import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";
import { CommentsService } from "src/app/shared/details/comments-tool-bar/comments.service";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs/operators";
import { defaultConcern, IConcernSummary } from "../concern-history.interface";
import { environment } from "@environment";
import { ConcernService } from "../service/concern.service";

@Component({
  selector: "app-create-concern",
  templateUrl: "./create-concern.component.html",
  styleUrls: ["./create-concern.component.scss"]
})
export class CreateConcernComponent implements OnInit {
  dateFormat = environment.dateFormat;
  downloadFiles = [
    {
      name: "Photos",
      updated: new Date("1/1/20"),
      type: "image"
    },
    {
      name: "Document",
      updated: new Date("1/17/19"),
      type: "doc"
    },
    {
      name: "Portable document format",
      updated: new Date("1/28/18"),
      type: "pdf"
    }
  ];
  concernForm: FormGroup;
  comments: FormArray;
  uploadedFiles: Array<File>;
  concernId: number;
  editMode: boolean;
  public concern$: Observable<
    IConcernSummary
  > = this.store.select((concernState) =>
    concernState.concern.item.concerns.find(
      (concern: IConcernSummary) => concern.concernId === this.concernId
    )
  );

  @ViewChild("dropArea") dropArea: ElementRef;

  private concern: IConcernSummary;
  constructor(
    private commentsService: CommentsService,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  preventDefaults(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  highlight() {
    this.dropArea.nativeElement.classList.add("highlight");
  }

  unhighlight() {
    this.dropArea.nativeElement.classList.remove("highlight");
  }

  handleDrop(e: any) {
    const dt = e.dataTransfer;
    this.uploadedFiles = dt.files;
    this.upload();
  }

  downloadDocument(event: Event): void {
    event.preventDefault();
    (window as any).alert("Your download should resume by next sprint 😀");
  }

  fileChange(element: any): void {
    this.uploadedFiles = element.target.files;
    this.upload();
  }

  ngOnInit(): void {
    this.initialiseData();
  }

  upload() {
    const formData = new FormData();
    Array.from(this.uploadedFiles).forEach((uploadedFile: File) => {
      formData.append("uploads[]", uploadedFile, uploadedFile.name);
    });
    (window as any).alert("Your upload should resume by next sprint 😀");
    // this.concernService.uploadFiles(formData).subscribe((response: any) => {
    //   // TODO: plug endpoint and show message on success / failure

    // });
  }

  private initialiseData(): void {
    this.concernId = Number(this.activatedRoute.snapshot.params.concernId);
    this.editMode = this.concernId ? true : false;

    this.concern$
      .pipe(
        tap((res: IConcernSummary) => {
          this.concern = res
            ? Object.assign({}, res)
            : Object.assign({}, defaultConcern);
          this.initialiseForm();
        })
      )
      .subscribe();
  }

  private initialiseForm(): void {
    this.concernForm = new FormGroup({});
    this.createCommentControls();
  }
  /**
   * creates a comments FormGroup for each comment
   * adds an empty comment FormGroup for readily adding comment
   */
  private createCommentControls(): void {
    this.comments = new FormArray([]);
    this.commentsService.comments = this.comments;
    if (this.concern.comments) {
      for (const comment of this.concern.comments) {
        this.commentsService.addCommentControl(comment);
      }
    }
    this.commentsService.addCommentControl();
    this.concernForm.addControl("comments", this.comments);
  }
}
