import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { TraineeService } from "../../core/trainee/trainee.service";
import {
  GetTrainees,
  ResetTraineesPaginator,
  ResetTraineesSort,
  SearchTrainees
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

@Component({
  selector: "app-trainee-search",
  templateUrl: "./trainee-search.component.html"
})
export class TraineeSearchComponent implements OnInit {
  @Select(TraineesState.searchQuery) searchQuery$: Observable<string>;
  public form: FormGroup;
  public params: Params = this.route.snapshot.queryParams;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private traineeService: TraineeService
  ) {}

  ngOnInit() {
    this.setupForm();
  }

  public setupForm(): void {
    this.form = this.formBuilder.group({
      searchQuery: [this.params.searchQuery || "", [Validators.required]]
    });
  }

  /**
   * If form is valid then trim leading and trailing whitespaces from query
   * So that search cannot be invoked with just blank spaces
   */
  public checkForm(): void {
    const searchQuery = this.form.value.searchQuery.trim();

    if (searchQuery.length && this.form.valid) {
      this.submitForm(searchQuery);
    }
  }

  public submitForm(searchQuery: string): void {
    this.store.dispatch(new SearchTrainees(searchQuery));
    this.store.dispatch(new ResetTraineesSort());
    this.store.dispatch(new ResetTraineesPaginator());
    this.store
      .dispatch(new GetTrainees())
      .pipe(take(1))
      .subscribe(() => this.traineeService.updateTraineesRoute());
  }
}
