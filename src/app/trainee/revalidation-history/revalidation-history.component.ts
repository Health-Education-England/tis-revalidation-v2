import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked
} from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { RevalidationNotesComponent } from "../revalidation-notes/revalidation-notes.component";
import { IRevalidationHistory } from "../revalidation-history.interface";
import { RevalidationHistoryState } from "../state/revalidation-history.state";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";
import { FormGroup } from "@angular/forms";
import { RevalidationFormComponent } from "../revalidation-form/revalidation-form.component";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-revalidation-history",
  templateUrl: "./revalidation-history.component.html",
  styleUrls: ["./revalidation-history.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RevalidationHistoryComponent implements OnInit, AfterViewChecked {
  @Select(RevalidationHistoryState.revalidationHistory)
  revalidationHistory$: Observable<IRevalidationHistory>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild("stepper") stepper: MatStepper;

  revalidationForm: FormGroup;
  confirmationForm: FormGroup;
  onRevalidationForm(formGroup: FormGroup): void {
    this.revalidationForm = formGroup;
  }
  onConfirmationForm(formGroup: FormGroup): void {
    this.confirmationForm = formGroup;
  }

  constructor(
    private bottomSheet: MatBottomSheet,
    private breakpointObserver: BreakpointObserver,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  saveDraft(): void {
    (window as any).alert("draft saved");
    this.resetMatStepper();
  }

  resetMatStepper(): void {
    this.stepper.reset();
    this.revalidationForm.reset();
    this.confirmationForm.reset();
  }

  openNotes(): void {
    this.bottomSheet.open(RevalidationNotesComponent);
  }
}
