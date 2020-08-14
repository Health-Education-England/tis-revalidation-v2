import { Component, ViewEncapsulation, OnDestroy, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store, Select } from "@ngxs/store";
import { AdminsState } from "../../../admins/state/admins.state";
import {
  IEmployer,
  IGrade,
  ISite,
  IConcernSummary
} from "../../concern.interfaces";
import { ConcernState } from "../../state/concern.state";
import { Observable, Subscription } from "rxjs";
import { IAllocateAdmin } from "src/app/admins/admins.interfaces";
import { MatStepper } from "@angular/material/stepper";
import { SetSelectedConcern } from "../../state/concern.actions";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";

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
export class TraineeDetailComponent implements OnDestroy {
  public formGroup: FormGroup;
  public grade: FormControl;
  public site: FormControl;
  public employer: FormControl;

  @Select(ConcernState.grades)
  public grades$: Observable<IGrade[]>;
  @Select(ConcernState.sites)
  public sites$: Observable<ISite[]>;
  @Select(ConcernState.employers)
  public employers$: Observable<IEmployer[]>;

  @Select(ConcernState.selected)
  selectedConcern$: Observable<IConcernSummary>;
  concern: IConcernSummary;

  subsciptions: Subscription[] = [];

  public get form() {
    return this.formGroup.controls;
  }

  @Input() stepper: MatStepper;

  constructor(private store: Store) {
    this.initialiseFormControls();
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach((subscribed: Subscription) => {
      if (subscribed.closed === false) {
        subscribed.unsubscribe();
      }
    });
  }

  /**
   * Initialise form controls and set fields needed to be required or not
   */
  public initialiseFormControls(): void {
    this.subsciptions.push(
      this.selectedConcern$.subscribe((cs: IConcernSummary) => {
        this.concern = cs;
        this.formGroup = new FormGroup({
          grade: new FormControl(cs.grade),
          site: new FormControl(cs.site),
          employer: new FormControl(cs.employer)
        });

        if (this.concern) {
          if (this.concern.source === "Lead Employer Trust (LET)") {
            this.form.site.setValidators([Validators.required]);
            this.form.employer.setValidators([Validators.required]);
          } else {
            this.form.site.clearValidators();
            this.form.employer.clearValidators();
          }
          this.form.site.updateValueAndValidity();
          this.form.employer.updateValueAndValidity();
        }
      })
    );
  }

  public onSubmit(): void {
    const admins: IAllocateAdmin[] = this.store.selectSnapshot(AdminsState)
      .allocateList;
    const admin = { admin: admins.length > 0 ? admins[0].admin : null };
    const newConcern = {
      ...this.concern,
      ...this.formGroup.value,
      ...admin
    };
    this.store.dispatch(new SetSelectedConcern(newConcern));
    if (this.stepper) {
      this.stepper.next();
    }
  }
}
