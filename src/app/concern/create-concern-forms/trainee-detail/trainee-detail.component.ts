import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IEmployer, IGrade, ISite } from "../../concern.interfaces";

@Component({
  selector: "app-trainee-detail",
  templateUrl: "./trainee-detail.component.html"
})
export class TraineeDetailComponent {
  public formGroup: FormGroup;
  public grade: FormControl;
  public site: FormControl;
  public employer: FormControl;
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

  constructor() {
    this.initialiseFormControls();
  }

  /**
   * Initialises all form controls and adds to FormGroup
   */
  public initialiseFormControls(): void {
    this.grade = new FormControl("", [Validators.required]);
    this.site = new FormControl("", [Validators.required]);
    this.employer = new FormControl("", [Validators.required]);
    this.formGroup.addControl("grade", this.grade);
    this.formGroup.addControl("site", this.site);
    this.formGroup.addControl("employer", this.employer);
  }
}