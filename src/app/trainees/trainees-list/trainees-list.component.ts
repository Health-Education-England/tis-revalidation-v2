import { Component, OnInit } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { ITrainee, ITraineeDataCell } from "../trainees.interface";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";
import { FormGroup, FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-trainees-list",
  templateUrl: "./trainees-list.component.html",
  styleUrls: ["./trainees-list.component.scss"]
})
export class TraineesListComponent implements OnInit {
  doctors: ITrainee[];
  sort: Sort;
  pageNumber: number;
  count: number;
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

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeRouteData();
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
   * gets resolved data from routeResolver class
   */
  private initializeRouteData(): void {
    this.route.data.subscribe((res: any) => {
      const resolvedData = res.store.doctors;
      if (resolvedData) {
        this.doctors = resolvedData.items;

        this.sort = {
          active: resolvedData.params.sortColumn,
          direction: resolvedData.params.sortOrder
        };

        this.pageNumber = resolvedData.params.pageNumber;

        if (
          resolvedData.params.underNotice &&
          (resolvedData.params.underNotice === true ||
            resolvedData.params.underNotice === "true")
        ) {
          this.count = resolvedData.countUnderNotice;
        } else {
          this.count = resolvedData.countTotal;
        }
      }
    });
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
        this.searchTrainee(searchTerm);
      });

    this.searchTraineesForm.addControl("searchTrainees", this.searchTrainees);
  }
}
