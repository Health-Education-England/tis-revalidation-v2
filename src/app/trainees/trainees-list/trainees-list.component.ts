import { Component, OnInit } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { ITrainee, ITraineeDataCell } from "../trainees.interface";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";
import { FormGroup, FormControl } from "@angular/forms";
import { debounceTime, map, shareReplay } from "rxjs/operators";
import { TraineesStateModel, TraineesState } from "../state/trainees.state";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-trainees-list",
  templateUrl: "./trainees-list.component.html",
  styleUrls: ["./trainees-list.component.scss"]
})
export class TraineesListComponent implements OnInit {
  @Select(TraineesState.trainees) trainees$: Observable<ITrainee[]>;
  @Select(TraineesState.sort) sort$: Observable<Sort>;
  @Select(TraineesState.pageNumber) pageNumber$: Observable<number>;
  @Select(TraineesState.count) count$: Observable<number>;

  isExtraLarge$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XLarge)
    .pipe(
      map((result) => {
        console.log("Xlarge", result);
        return result.matches;
      }),
      shareReplay()
    );

  isLarge$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Large)
    .pipe(
      map((result) => {
        console.log("Large", result);
        return result.matches;
      }),
      shareReplay()
    );

  searchTraineesForm: FormGroup;
  searchTrainees: FormControl;

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isExtraLarge$.subscribe();
  }

  ngOnInit(): void {
    this.initializeSearchForm();
  }

  public searchSubmit() {
    if (this.searchTraineesForm.valid) {
      this.searchTrainee(this.searchTrainees.value);
    }
  }

  public searchTrainee(searchTerm: any): void {
    let searchParams = {};
    if (searchTerm) {
      searchParams = {
        search: searchTerm,
        pageNumber: 0 // reset page to 0 on search
      };
    } else {
      delete this.route.snapshot.params.search;
    }
    this.redirectRoute(searchParams);
  }

  public traineeDetails(event: Event, row: ITrainee): void {
    event.stopPropagation();
    this.router.navigate(["/trainees/trainee", row.gmcReferenceNumber]);
  }

  public sortTrainees(event: Sort): void {
    const sortParams = {
      sortColumn: event.active,
      sortOrder: event.direction,
      pageNumber: 0 // reset page to on sort
    };
    this.redirectRoute(sortParams);
  }

  public paginateTrainees(event: PageEvent) {
    const pageParams = {
      pageNumber: event.pageIndex
    };
    this.redirectRoute(pageParams);
  }

  public resetData(): void {
    this.searchTraineesForm.reset();
    this.router.navigate(["./", {}], { relativeTo: this.route });
  }

  private redirectRoute(sentParams: Params) {
    let params = this.route.snapshot.params;
    params = { ...params, ...sentParams };
    this.router.navigate(["./", params], { relativeTo: this.route });
  }

  /**
   * sets up search form for searching trainee data and auto search debounce of 1 second
   */
  private initializeSearchForm(): void {
    this.searchTraineesForm = new FormGroup({});
    this.searchTrainees = new FormControl("");
    this.searchTrainees.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((searchTerm: any) => {
        if (searchTerm && searchTerm.length >= 2) {
          this.searchTrainee(searchTerm);
        }
      });

    this.searchTraineesForm.addControl("searchTrainees", this.searchTrainees);
  }
}
