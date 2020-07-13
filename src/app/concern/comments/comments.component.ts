import { Component, OnInit } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { CommentsService } from "../../shared/details/comments-tool-bar/comments.service";
import { IConcernSummary } from "../concern.interfaces";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html"
})
export class CommentsComponent implements OnInit {
  public selected: IConcernSummary = this.store.selectSnapshot(
    (state) => state.concern.selected
  );
  public form: FormGroup;
  public comments: FormArray;

  constructor(private commentsService: CommentsService, private store: Store) {}

  ngOnInit(): void {
    this.setupForm();
    this.createCommentControls();
  }

  public setupForm(): void {
    this.form = new FormGroup({});
    this.comments = new FormArray([]);
  }

  /**
   * creates a comments FormGroup for each comment
   * adds an empty comment FormGroup for readily adding comment
   */
  private createCommentControls(): void {
    this.commentsService.comments = this.comments;
    if (this.selected && this.selected.comments) {
      for (const comment of this.selected.comments) {
        this.commentsService.addCommentControl(comment);
      }
    }
    this.commentsService.addCommentControl();
    this.form.addControl("comments", this.comments);
  }
}
