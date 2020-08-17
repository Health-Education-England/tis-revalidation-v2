import { Component, Input, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { ApiService } from "../../../shared/services/api/api.service";
import {
  ConcernStatus,
  IConcernSummary,
  ISource,
  IConcernType
} from "../../concern.interfaces";
import { ConcernService } from "../../services/concern/concern.service";
import { SetSelectedConcern } from "../../state/concern.actions";
import { ConcernState } from "../../state/concern.state";

@Component({
  selector: "app-concern-detail",
  templateUrl: "./concern-detail.component.html"
})
export class ConcernDetailComponent implements OnDestroy {
  formGroup: FormGroup;
  statusText: string;
  lessThanEqualToday: Date;
  greaterThanToday: Date;
  subsciptions: Subscription[] = [];
  @Select(ConcernState.selected)
  selectedConcern$: Observable<IConcernSummary>;
  concern: IConcernSummary;

  @Select(ConcernState.concernTypes)
  public concernTypes$: Observable<IConcernType[]>;

  @Select(ConcernState.sources)
  public sources$: Observable<ISource[]>;

  @Input() stepper: MatStepper;

  public get form() {
    return this.formGroup.controls;
  }

  constructor(
    private store: Store,
    private apiService: ApiService,
    private concernService: ConcernService
  ) {
    this.setupForm();
    this.subscribeToStatusChanges();
    this.updateFormControls();
    this.initialiseMaxMinDates();
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach((subscribed: Subscription) => {
      if (subscribed.closed === false) {
        subscribed.unsubscribe();
      }
    });
  }

  /**
   * Update form controls
   */
  updateFormControls(): void {
    this.subsciptions.push(
      this.selectedConcern$
        .pipe(filter(Boolean))
        .subscribe((cs: IConcernSummary) => {
          this.concern = cs;
          this.form.dateOfIncident.setValue(cs.dateOfIncident);
          this.form.concernType.setValue(cs.concernType);
          this.form.source.setValue(cs.source);
          this.form.dateReported.setValue(cs.dateReported);
          this.form.followUpDate.setValue(cs.followUpDate);
          this.form.status.setValue(this.getConcernStatus(cs.status));
        })
    );
  }

  initialiseMaxMinDates(): void {
    this.lessThanEqualToday = new Date();
    this.greaterThanToday = new Date();
    this.greaterThanToday.setDate(this.greaterThanToday.getDate() + 1);
  }

  getConcernStatus(status: ConcernStatus): boolean {
    return status === ConcernStatus.CLOSED ? false : true;
  }

  setConcernStatus(status: boolean): ConcernStatus {
    return status === false ? ConcernStatus.CLOSED : ConcernStatus.OPEN;
  }

  onSubmit(): void {
    const newConcern = {
      ...this.concern,
      ...this.formGroup.value,
      status: this.apiService.getEnumKey(
        ConcernStatus,
        this.setConcernStatus(this.form.status.value)
      )
    };

    this.store.dispatch(new SetSelectedConcern(newConcern));
    this.concernService.isConcernDetailFormValid.next(this.formGroup.valid);

    if (this.stepper) {
      this.stepper.next();
    }
  }

  private subscribeToStatusChanges(): void {
    this.subsciptions.push(
      this.form.status.valueChanges.subscribe((val) => {
        this.statusText = this.setConcernStatus(val);
      })
    );
  }

  private setupForm(): void {
    this.formGroup = new FormGroup({
      dateOfIncident: new FormControl(null, [Validators.required]),
      concernType: new FormControl(null, [Validators.required]),
      source: new FormControl(null, [Validators.required]),
      dateReported: new FormControl(null, [Validators.required]),
      followUpDate: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required])
    });
  }
}
