import { Component, Input, OnDestroy, AfterViewInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { ApiService } from "../../../shared/services/api/api.service";
import {
  ConcernStatus,
  IConcernSummary,
  IEntity
} from "../../concern.interfaces";
import { ConcernService } from "../../services/concern/concern.service";
import { SetSelectedConcern } from "../../state/concern.actions";
import { ConcernState } from "../../state/concern.state";
import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-concern-detail",
  templateUrl: "./concern-detail.component.html"
})
export class ConcernDetailComponent implements OnDestroy, AfterViewInit {
  formGroup: FormGroup;
  statusText: string;
  lessThanEqualToday: Date;
  greaterThanToday: Date;
  subsciptions: Subscription[] = [];
  @Select(ConcernState.selected)
  selectedConcern$: Observable<IConcernSummary>;
  concern: IConcernSummary;
  public compareFn = this.concernService.compareFn;

  @Select(ConcernState.concernTypes)
  public concernTypes$: Observable<IEntity[]>;

  @Select(ConcernState.sources)
  public sources$: Observable<IEntity[]>;

  @Input() stepper: MatStepper;

  public backRoute: string[];

  public get form() {
    return this.formGroup.controls;
  }

  constructor(
    private store: Store,
    private apiService: ApiService,
    private concernService: ConcernService,
    private activatedRoute: ActivatedRoute
  ) {
    this.setupForm();
    this.subscribeToStatusChanges();
    this.updateFormControls();
    this.setUpBackRoute();
    this.initialiseMaxMinDates();
  }

  ngAfterViewInit(): void {
    this.setUpStepperListener();
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

  setUpBackRoute(): void {
    this.backRoute = this.activatedRoute.snapshot.params.concernId
      ? ["../../"]
      : ["../"];
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

  private onSubmit(): void {
    const newConcern = {
      ...this.concern,
      ...this.formGroup.value,
      status: this.apiService.getEnumKey(
        ConcernStatus,
        this.setConcernStatus(this.form.status.value)
      )
    };

    this.store.dispatch(new SetSelectedConcern(newConcern));
  }

  private setUpStepperListener(): void {
    if (this.stepper) {
      this.subsciptions.push(
        this.stepper.selectionChange.subscribe(
          (step: StepperSelectionEvent) => {
            if (step.previouslySelectedStep.stepControl === this.formGroup) {
              this.onSubmit();
            }
          }
        )
      );
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
