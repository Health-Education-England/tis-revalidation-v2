import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { TraineesService } from "../trainees.service";
import { ActivatedRoute, Params } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-trainees-paginator",
  templateUrl: "./trainees-paginator.component.html"
})
export class TraineesPaginatorComponent implements OnInit {
  currentParams: Params;
  pageIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  totalResults$ = this.traineeService.totalResults$;

  constructor(
    public traineeService: TraineesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.currentParams = params;
      this.pageIndex$.next(this.currentParams.pageNumber);
    });
  }

  public paginate(event: PageEvent) {
    const pageParams = this.traineeService.mergeParameters(this.currentParams, {
      pageNumber: event.pageIndex
    });
    this.traineeService.updateRoute(pageParams);
  }
}
