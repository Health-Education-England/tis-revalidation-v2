import { Component, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { AdminsState } from "../../../admins/state/admins.state";
import { IEmployer, IGrade, ISite } from "../../concern.interfaces";

@Component({
  selector: "app-trainee-detail",
  templateUrl: "./trainee-detail.component.html",
  styleUrls: ["./trainee-detail.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class TraineeDetailComponent {
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

  public get form() {
    return this.formGroup.controls;
  }

  constructor(private store: Store) {
    this.initialiseFormControls();
  }

  /**
   * Initialise FormGroup
   */
  public initialiseFormControls(): void {
    // TODO only make site, employer mandatory if source = LET
    this.formGroup = new FormGroup({
      grade: new FormControl(""),
      site: new FormControl("", [Validators.required]),
      employer: new FormControl("", [Validators.required])
    });
  }

  // TODO dispatch event and save form values on store
  public onSubmit(): void {
    console.log(
      "%c onSubmit fired ",
      "background:red; color:white",
      this.formGroup.value,
      this.store.selectSnapshot(AdminsState).allocateList[0].admin
    );
  }
}
