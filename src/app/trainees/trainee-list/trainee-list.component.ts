import { Component, OnInit } from "@angular/core";
import { Sort as ISort } from "@angular/material/sort";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { environment } from "@environment";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import {
  ITrainee,
  ITraineeDataCell,
  TraineesFilterType
} from "../trainees.interfaces";
import { TraineesService } from "../services/trainees.service";
import {
  Filter,
  Get,
  Paginate,
  ResetPaginator,
  ResetSort,
  Search,
  Sort
} from "../state/trainees.actions";
import { TraineesState } from "../state/trainees.state";

@Component({
  selector: "app-trainee-list",
  templateUrl: "./trainee-list.component.html",
  styleUrls: ["./trainee-list.component.scss"]
})
export class TraineeListComponent implements OnInit {
  @Select(TraineesState.loading) loading$: Observable<boolean>;
  @Select(TraineesState.items) items$: Observable<ITrainee[]>;
  @Select(TraineesState.totalResults) totalResults$: Observable<number>;
  @Select(TraineesState.sort) sort$: Observable<ISort>;
  @Select(TraineesState.error) error$: Observable<string>;

  public dateFormat: string = environment.dateFormat;
  public dateColumns: string[] = [
    "cctDate",
    "submissionDate",
    "dateAdded",
    "lastUpdatedDate"
  ];
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
  public columnNames: string[] = this.columnData.map((i) => i.name);
  public params: Params = this.route.snapshot.queryParams;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private traineeService: TraineesService
  ) {}

  /**
   * Check if query params exist
   * Then dispatch appropriate events
   * And update store accordingly
   */
  ngOnInit(): void {
    this.setupInitialSorting();
    this.setupInitialPagination();
    this.setupInitialFilter();
    this.checkInitialSearchQuery();
    this.store.dispatch(new Get());
  }

  public setupInitialSorting(): void {
    if (this.params.active && this.params.direction) {
      this.store.dispatch(new Sort(this.params.active, this.params.direction));
    } else {
      this.store.dispatch(new ResetSort());
    }
  }

  public setupInitialPagination(): void {
    if (this.params.pageIndex) {
      this.store.dispatch(new Paginate(this.params.pageIndex));
    } else {
      this.store.dispatch(new ResetPaginator());
    }
  }

  public setupInitialFilter(): void {
    if (
      this.params.filter &&
      this.params.filter === TraineesFilterType.ALL_DOCTORS
    ) {
      this.store.dispatch(new Filter(TraineesFilterType.ALL_DOCTORS));
    } else {
      this.store.dispatch(new Filter(TraineesFilterType.UNDER_NOTICE));
    }
  }

  public checkInitialSearchQuery(): void {
    if (this.params.searchQuery) {
      this.store.dispatch(new Search(this.params.searchQuery));
    }
  }

  public navigateToDetails(event: Event, row: ITrainee): Promise<boolean> {
    event.stopPropagation();
    return this.router.navigate(["/trainee", row.gmcReferenceNumber]);
  }

  public sort(event: ISort): void {
    this.store.dispatch(new Sort(event.active, event.direction));
    this.store.dispatch(new ResetPaginator());
    this.store
      .dispatch(new Get())
      .pipe(take(1))
      .subscribe(() => this.traineeService.updateTraineesRoute());
  }
}
