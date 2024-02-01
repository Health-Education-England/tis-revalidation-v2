import { Component, OnInit, Input } from "@angular/core";
import { UntypedFormArray, UntypedFormGroup } from "@angular/forms";
import { CommentsService } from "./comments.service";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  public form: UntypedFormGroup;
  public comments: UntypedFormArray;
  @Input() featureComments: string[] = [];
  public partialSelection$ = this.commentsService.partialSelection$;
  public allSelected$ = this.commentsService.allSelected$;

  constructor(
    private commentsService: CommentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setupForm();
    this.createCommentControls();
  }

  public setupForm(): void {
    this.form = new UntypedFormGroup({});
    this.comments = new UntypedFormArray([]);
  }

  /**
   * creates a comments FormGroup for each comment
   * adds an empty comment FormGroup for readily adding comment
   */
  private createCommentControls(): void {
    if (!this.featureComments) this.featureComments = [];
    this.commentsService.comments = this.comments;
    for (const comment of this.featureComments) {
      this.commentsService.addCommentControl(comment);
    }

    this.commentsService.addCommentControl();
    this.form.addControl("comments", this.comments);
  }

  addCommentControl() {
    this.checkForComments();
    this.commentsService.addCommentControl();
  }

  selectAllComments(event: MatCheckboxChange): void {
    this.checkForComments();
    this.commentsService.selectAllComments(event.checked);
  }

  deleteCommentControl(): void {
    const dialogRef = this.dialog.open(DeleteCommentDialogueComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.checkForComments();
        this.commentsService.deleteCommentControl();
        // 😃 if edit mode data is still available on refresh?
      }
    });
  }

  private checkForComments(): void {
    if (!this.commentsService.comments) {
      throw new Error(`Instantiate FormArray comments on commentsService`);
    }
  }
}
@Component({
  selector: "app-delete-comments-dialog",
  template: `<h1 mat-dialog-title>Delete comments</h1>
    <div mat-dialog-content>
      <p>Please confirm you would like to delete comment(s)?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button mat-dialog-close="true" cdkFocusInitial>Yes</button>
    </div>`
})
export class DeleteCommentDialogueComponent {
  constructor(public dialogRef: MatDialogRef<DeleteCommentDialogueComponent>) {}
}
