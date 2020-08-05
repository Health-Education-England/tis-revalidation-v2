import { Component, OnDestroy, Input } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import {
  IncidentType,
  IConcernSummary,
  ConcernStatus
} from "../../concern.interfaces";
import { Select, Store } from "@ngxs/store";
import { ConcernState } from "../../state/concern.state";
import { MatStepper } from "@angular/material/stepper";
import { SetSelectedConcern } from "../../state/concern.actions";

@Component({
  selector: "app-concern-detail",
  templateUrl: "./concern-detail.component.html"
})
export class ConcernDetailComponent implements OnDestroy {
  formGroup: FormGroup = new FormGroup({});
  dateOfIncident: FormControl;
  concernType: FormControl;
  source: FormControl;
  dateReported: FormControl;
  followUpDate: FormControl;
  status: FormControl;
  statusText: string;
  lessThanEqualToday: Date;
  greaterThanToday: Date;
  subsciptions: Subscription[] = [];
  @Select(ConcernState.selected)
  selectedConcern$: Observable<IConcernSummary>;
  concern: IConcernSummary;

  incidentTypes: IncidentType[] = [
    { code: "COMPLAINT", label: "Complaint" },
    { code: "CONDUCT", label: "Conduct" },
    { code: "CAPABILITY", label: "Capability" },
    { code: "SERIOUS_INCIDENT", label: "Serious Incident" },
    { code: "SIGNIFICANT_EVENT", label: "Significant Event" },
    { code: "NEVER_EVENT", label: "Never event" },
    { code: "GMC_ISSUE", label: "GMC issue" },
    { code: "OTHER", label: "Other" }
  ];

  incidentSources = [
    "Lead Employer Trust (LET)",
    "Trainee",
    "TPD",
    "Specialty Team",
    "Previous HEE",
    "GMC",
    "Other"
  ];

  @Input() stepper: MatStepper;

  constructor(private store: Store) {
    this.InitialiseFormControls();
    this.InitialiseMaxMinDates();
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach((subscribed: Subscription) => {
      if (subscribed.closed === false) {
        subscribed.unsubscribe();
      }
    });
  }

  /**
   * Initialises all form controls and adds to FormGroup
   */
  InitialiseFormControls(): void {
    this.subsciptions.push(
      this.selectedConcern$.subscribe((cs: IConcernSummary) => {
        this.concern = cs;
        this.dateOfIncident = new FormControl(cs.dateOfIncident, [
          Validators.required
        ]);
        this.concernType = new FormControl(cs.concernType, [
          Validators.required
        ]);
        this.source = new FormControl(cs.source, [Validators.required]);
        this.dateReported = new FormControl(cs.dateReported, [
          Validators.required
        ]);
        this.followUpDate = new FormControl(cs.followUpDate, [
          Validators.required
        ]);
        this.status = new FormControl(cs.status, [Validators.required]);
        this.subscribeToStatusChanges();
        this.addFormControls();
        this.bindDefaultStatus(cs.status);
      })
    );
  }

  subscribeToStatusChanges(): void {
    this.subsciptions.push(
      this.status.valueChanges.subscribe((val) => {
        this.statusText = val ? "Open" : "Closed";
      })
    );
  }

  addFormControls(): void {
    this.formGroup.addControl("dateOfIncident", this.dateOfIncident);
    this.formGroup.addControl("concernType", this.concernType);
    this.formGroup.addControl("source", this.source);
    this.formGroup.addControl("dateReported", this.dateReported);
    this.formGroup.addControl("followUpDate", this.followUpDate);
    this.formGroup.addControl("status", this.status);
  }

  bindDefaultStatus(status: ConcernStatus): void {
    const statusValue: boolean = status
      ? status === ConcernStatus.OPEN
        ? true
        : false
      : true;
    this.status.setValue(statusValue);
  }

  InitialiseMaxMinDates(): void {
    this.lessThanEqualToday = new Date();
    this.greaterThanToday = new Date();
    this.greaterThanToday.setDate(this.greaterThanToday.getDate() + 1);
  }

  onSubmit(): void {
    const newConcern = { ...this.concern, ...this.formGroup.value };
    this.store.dispatch(new SetSelectedConcern(newConcern));
    this.stepper.next();
  }
}
