import { Component, OnInit } from "@angular/core";
import { CommentsService } from "./comments.service";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-comments-tool-bar",
  templateUrl: "./comments-tool-bar.component.html",
  styleUrls: ["./comments-tool-bar.component.scss"]
})
export class CommentsToolBarComponent implements OnInit {
  partialSelection$ = this.commentsService.partialSelection$;
  allSelected$ = this.commentsService.allSelected$;

  constructor(
    private commentsService: CommentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

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
