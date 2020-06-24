import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TraineesService } from "../trainees.service";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-trainees-search",
  templateUrl: "./trainees-search.component.html",
  encapsulation: ViewEncapsulation.None
})
export class TraineesSearchComponent implements OnInit {
  showMessage = false;
  searchForm: FormGroup;
  searchQuery: FormControl;
  currentParams: Params;

  constructor(
    public traineeService: TraineesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  resetTraineeList(): void {
    this.searchForm.reset();
    this.search();
    this.showMessage = false;
  }

  search(updateUI?: boolean): void {
    let search = this.searchQuery.value;
    search = search === "" ? null : search;
    const searchParams = this.traineeService.mergeParameters(
      this.currentParams,
      {
        searchQuery: search,
        pageNumber: 0
      }
    );
    this.traineeService.updateRoute(searchParams);
    if (updateUI) {
      this.showMessage = search ? false : true;
    }
  }

  initializeForm(): void {
    this.searchForm = new FormGroup({});
    this.searchQuery = new FormControl();
    this.searchForm.addControl("searchQuery", this.searchQuery);
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.currentParams = params;
      this.searchQuery.setValue(this.currentParams.searchQuery);
    });
  }
}
