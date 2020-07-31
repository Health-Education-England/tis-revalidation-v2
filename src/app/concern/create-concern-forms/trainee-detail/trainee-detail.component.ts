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
  // TODO bind with BE once ready
  public grades: IGrade[] = [
    {
      gradeId: 288,
      gradeName: "Specialty Training Year 2"
    }
  ];
  public sites: ISite[] = [
    {
      siteId: 12940,
      siteName: "Leicestershire Partnership NHS Trust Mental Health Services"
    },
    {
      siteId: 12956,
      siteName: "Glenfield Hospital”"
    }
  ];
  public employers: IEmployer[] = [
    {
      employerId: 288,
      employerName: "Employer 1"
    }
  ];

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
    this.setRequiredFields();
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach((subscribed: Subscription) => {
      if (subscribed.closed === false) {
        subscribed.unsubscribe();
      }
    });
  }

  /**
   * Initialise FormGroup
   */
  public initialiseFormControls(): void {
    // TODO only make site, employer mandatory if source = LET
    this.formGroup = new FormGroup({
      grade: new FormControl(""),
      site: new FormControl(""),
      employer: new FormControl("")
    });
  }
  /**
   * set fields needed to be required or not
   */
  public setRequiredFields(): void {
    this.subsciptions.push(
      this.selectedConcern$.subscribe((cs: IConcernSummary) => {
        this.concern = cs;
        this.formGroup = new FormGroup({
          grade: new FormControl(cs.grade),
          site: new FormControl(cs.site),
          employer: new FormControl(cs.employer)
        });
        debugger;
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

  // TODO dispatch event and save form values on store
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
    this.stepper.next();
  }
}
