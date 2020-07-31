import { Component, OnDestroy, Input } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { IncidentType, IConcernSummary } from "../../concern.interfaces";
import { Select } from "@ngxs/store";
import { ConcernState } from "../../state/concern.state";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-concern-detail",
  templateUrl: "./concern-detail.component.html"
})
export class ConcernDetailComponent implements OnDestroy {
  formGroup: FormGroup;
  incidentDate: FormControl;
  concernType: FormControl;
  concernSource: FormControl;
  reportedDate: FormControl;
  followupDate: FormControl;
  concernStatus: FormControl;
  statusText: string;
  lessThanEqualToday: Date;
  greaterThanToday: Date;
  subsciptions: Subscription[] = [];
  @Select(ConcernState.selected)
  selectedConcern$: Observable<IConcernSummary>;

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

  constructor() {
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
    this.incidentDate = new FormControl("", [Validators.required]);
    this.concernType = new FormControl("", [Validators.required]);
    this.concernSource = new FormControl("", [Validators.required]);
    this.reportedDate = new FormControl("", [Validators.required]);
    this.followupDate = new FormControl("", [Validators.required]);
    this.concernStatus = new FormControl("", [Validators.required]);
    this.subsciptions.push(
      this.concernStatus.valueChanges.subscribe((val) => {
        this.statusText = val ? "Open" : "Closed";
      })
    );
    // bind concernstatus
    this.concernStatus.setValue(true);
    this.formGroup = new FormGroup({});
    this.formGroup.addControl("incidentDate", this.incidentDate);
    this.formGroup.addControl("concernType", this.concernType);
    this.formGroup.addControl("concernSource", this.concernSource);
    this.formGroup.addControl("reportedDate", this.reportedDate);
    this.formGroup.addControl("followupDate", this.followupDate);
    this.formGroup.addControl("concernStatus", this.concernStatus);
  }

  InitialiseMaxMinDates(): void {
    this.lessThanEqualToday = new Date();
    this.greaterThanToday = new Date();
    this.greaterThanToday.setDate(this.greaterThanToday.getDate() + 1);
  }
}
