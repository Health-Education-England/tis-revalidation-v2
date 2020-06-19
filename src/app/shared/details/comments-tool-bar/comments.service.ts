import { Injectable } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl
} from "@angular/forms";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
/**
 * Add delete comment formControls from tool-bar UI
 */
export class CommentsService {
  comments: FormArray;
  filteredControls: AbstractControl[];
  partialSelection$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  allSelected$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  addCommentControl(commentText?: string): void {
    const commentControl = new FormGroup({
      comment: new FormControl(commentText ? commentText : ""),
      checkbox: new FormControl(false)
    });
    this.comments.push(commentControl);
    commentControl.controls.checkbox.valueChanges.subscribe(() => {
      this.filteredControls = this.comments.controls.filter(
        this.filterControls
      );
      const allselected =
        this.filteredControls.length === this.comments.controls.length;
      const someSelection = this.filteredControls.length > 0 && !allselected;
      this.allSelected$.next(allselected);
      this.partialSelection$.next(someSelection);
    });
  }

  /**
   * filters checkbox FormControls marked for deletion
   * deletes appropriate controls
   */
  deleteCommentControl(): void {
    this.filteredControls = this.comments.controls.filter(this.filterControls);
    this.filteredControls.forEach(() => {
      this.comments.removeAt(
        this.comments.controls.findIndex(this.filterControls)
      );
    });
  }

  selectAllComments(val: any) {
    this.comments.controls.forEach((commentControl: FormGroup) => {
      const checkbox = commentControl.controls.checkbox;
      checkbox.setValue(val);
    });
  }

  filterControls(commentControl: FormGroup) {
    const checkbox = commentControl.controls.checkbox;
    return checkbox.value === true;
  }
}
