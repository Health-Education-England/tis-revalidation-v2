import {
  STEPPER_GLOBAL_OPTIONS,
  StepperSelectionEvent
} from "@angular/cdk/stepper";
import {
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
  AfterViewInit
} from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { IAllocateAdmin } from "src/app/admins/admins.interfaces";
import { ClearAllocateList } from "../../../admins/state/admins.actions";
import { AdminsState } from "../../../admins/state/admins.state";
import { IConcernSummary, IEntity } from "../../concern.interfaces";
import { ConcernService } from "../../services/concern/concern.service";
import { SetSelectedConcern } from "../../state/concern.actions";
import { ConcernState } from "../../state/concern.state";

@Component({
  selector: "app-trainee-detail",
  templateUrl: "./trainee-detail.component.html",
  styleUrls: ["./trainee-detail.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class TraineeDetailComponent implements OnDestroy, AfterViewInit {
  public formGroup: UntypedFormGroup;
  public admin: string;

  @Select(ConcernState.gmcNumber)
  public gmcNumber$: Observable<number>;
  @Select(ConcernState.grades)
  public grades$: Observable<IEntity[]>;
  @Select(ConcernState.sites)
  public sites$: Observable<IEntity[]>;
  @Select(ConcernState.employers)
  public employers$: Observable<IEntity[]>;

  @Select(ConcernState.selected)
  selectedConcern$: Observable<IConcernSummary>;
  concern: IConcernSummary;
  subsciptions: Subscription[] = [];
  public compareFn = this.concernService.compareFn;

  public get form() {
    return this.formGroup.controls;
  }

  @Input() stepper: MatStepper;

  constructor(private store: Store, private concernService: ConcernService) {
    this.setupForm();
    this.updateFormControls();
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach((subscribed: Subscription) => {
      if (subscribed.closed === false) {
        subscribed.unsubscribe();
      }
    });

    this.store.dispatch(new ClearAllocateList());
  }

  ngAfterViewInit(): void {
    this.setUpStepperListener();
  }

  private setupForm(): void {
    this.formGroup = new UntypedFormGroup({
      grade: new UntypedFormControl(),
      site: new UntypedFormControl(),
      employer: new UntypedFormControl()
    });
  }

  private setUpStepperListener(): void {
    if (this.stepper) {
      this.subsciptions.push(
        this.stepper.selectionChange.subscribe(
          (step: StepperSelectionEvent) => {
            if (step.previouslySelectedStep.stepControl === this.formGroup) {
              this.updateState();
            }
          }
        )
      );
    }
  }

  /**
   * Update form controls and conditionally set validation rules
   */
  public updateFormControls(): void {
    this.subsciptions.push(
      this.selectedConcern$
        .pipe(filter(Boolean))
        .subscribe((cs: IConcernSummary) => {
          this.concern = cs;
          this.admin = cs.admin;
          this.form.grade.setValue(cs.grade);
          this.form.site.setValue(cs.site);
          this.form.employer.setValue(cs.employer);
          this.setValidationRules();
        })
    );
  }

  private setValidationRules(): void {
    if (
      this.concern.source &&
      (this.concern.source.label === "Lead Employer Trust (LET)" ||
        this.concern.source.id === 1)
    ) {
      this.form.site.setValidators([Validators.required]);
      this.form.employer.setValidators([Validators.required]);
    } else {
      this.form.site.clearValidators();
      this.form.employer.clearValidators();
    }
    this.form.site.updateValueAndValidity();
    this.form.employer.updateValueAndValidity();
  }

  private updateState(): Observable<any> | false {
    const admins: IAllocateAdmin[] = this.store.selectSnapshot(AdminsState)
      .allocateList;
    const admin = { admin: admins.length > 0 ? admins[0].admin : null };
    const newConcern = {
      ...this.concern,
      ...this.formGroup.value,
      ...{ admin: admin.admin }
    };
    this.store.dispatch(new SetSelectedConcern(newConcern));

    if (!this.stepper) {
      return false;
    }
  }
}
