import { Component, ViewChild, OnInit } from "@angular/core";
import { ExceptionsLogService } from "./services/exceptions-log.service";
import { IException } from "./exceptions-log.interface";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "@environment";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { RecordsService } from "src/app/records/services/records.service";
import { Router } from "@angular/router";
import { EXCEPTIONSLOG_COLUMN_DATA } from "../constants";
@Component({
  selector: "app-exceptions-log",
  templateUrl: "./exceptions-log.component.html"
})
export class ExceptionsLogComponent implements OnInit {
  constructor(
    private exceptionsLogService: ExceptionsLogService,
    protected router: Router,
    private recordsService: RecordsService
  ) {}

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (sort && this.dataSource) {
      this.dataSource.sort = sort;
    }
  }

  pageStatus: string = "loading";
  dataSource: MatTableDataSource<IException>;
  dateFormat: string = environment.dateTimeFormat;
  displayedColumns = EXCEPTIONSLOG_COLUMN_DATA;
  displayedColumnNames = this.displayedColumns.map((column) => column.name);
  exceptionsLogData$: Observable<IException[]> = this.exceptionsLogService
    .getExceptions()
    .pipe(
      catchError(() => {
        this.pageStatus = "error";
        return of(null);
      })
    );

  ngOnInit(): void {
    this.exceptionsLogData$.subscribe((exceptions) => {
      if (this.pageStatus !== "error") {
        this.dataSource = new MatTableDataSource(exceptions);
        if (exceptions?.length) {
          this.pageStatus = "ok";
        } else {
          this.pageStatus = "empty";
        }
      }
    });
  }
  navigateToDetails(event: Event, row: any): void {
    event.stopPropagation();
    this.pageStatus = "loading";
    if (row.gmcId) {
      this.router.navigate([this.recordsService.detailsRoute, row.gmcId]);
    }
  }
}
