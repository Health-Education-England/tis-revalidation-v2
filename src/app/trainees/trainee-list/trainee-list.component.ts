import { Component, OnInit } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import {
  ITrainee,
  ITraineeDataCell
} from "../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../core/trainee/trainee.service";
import {
  GetTrainees,
  PaginateTrainees,
  ResetTraineesPaginator,
  ResetTraineesSort,
  SearchTrainees,
  SortTrainees
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

@Component({
  selector: "app-trainee-list",
  templateUrl: "./trainee-list.component.html"
})
export class TraineeListComponent implements OnInit {
  @Select(TraineesState.loading) loading$: Observable<boolean>;
  @Select(TraineesState.trainees) trainees$: Observable<ITrainee[]>;
  @Select(TraineesState.totalResults) totalResults$: Observable<number>;
  @Select(TraineesState.sort) sort$: Observable<Sort>;

  public columnData: ITraineeDataCell[] = [
    {
      label: "First name",
      name: "doctorFirstName",
      enableSort: true
    },
    {
      label: "Last name",
      name: "doctorLastName",
      enableSort: true
    },
    {
      label: "Gmc no",
      name: "gmcReferenceNumber",
      enableSort: false
    },
    {
      label: "GMC Submission due date",
      name: "submissionDate",
      enableSort: true
    },
    {
      label: "Status",
      name: "doctorStatus",
      enableSort: false
    },
    {
      label: "Programme name",
      name: "programmeName",
      enableSort: false
    },
    {
      label: "Programme membership type",
      name: "programmeMembershipType",
      enableSort: false
    },
    {
      label: "CCT date",
      name: "cctDate",
      enableSort: true
    },
    {
      label: "Admin",
      name: "admin",
      enableSort: false
    },
    {
      label: "Last updated",
      name: "lastUpdatedDate",
      enableSort: true
    }
  ];
  public columnLabels: string[] = this.columnData.map((i) => i.label);
  public params: Params = this.route.snapshot.queryParams;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private traineeService: TraineeService
  ) {}

  /**
   * Check if query params exist
   * Then dispatch appropriate events
   * And update store accordingly
   */
  ngOnInit(): void {
    this.setupInitialSorting();
    this.setupInitialPagination();
    this.checkInitialSearchQuery();
    this.store.dispatch(new GetTrainees());
  }

  public setupInitialSorting(): void {
    if (this.params.active && this.params.direction) {
      this.store.dispatch(
        new SortTrainees(this.params.active, this.params.direction)
      );
    } else {
      this.store.dispatch(new ResetTraineesSort());
    }
  }

  public setupInitialPagination(): void {
    if (this.params.pageIndex) {
      this.store.dispatch(new PaginateTrainees(this.params.pageIndex));
    } else {
      this.store.dispatch(new ResetTraineesPaginator());
    }
  }

  public checkInitialSearchQuery(): void {
    if (this.params.searchQuery) {
      this.store.dispatch(new SearchTrainees(this.params.searchQuery));
    }
  }

  public traineeDetails(event: Event, row: ITrainee): Promise<boolean> {
    event.stopPropagation();
    return this.router.navigate(["/trainee", row.gmcReferenceNumber]);
  }

  public sortTrainees(event: Sort): void {
    this.store.dispatch(new SortTrainees(event.active, event.direction));
    this.store.dispatch(new ResetTraineesPaginator());
    this.store
      .dispatch(new GetTrainees())
      .pipe(take(1))
      .subscribe(() => this.traineeService.updateTraineesRoute());
  }
}
