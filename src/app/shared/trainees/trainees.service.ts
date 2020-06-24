import { Injectable } from "@angular/core";
import { ITraineesDataCell } from "./trainees.interface";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Sort as ISort } from "@angular/material/sort/sort";
import { Store } from "@ngxs/store";

@Injectable({
  providedIn: "root"
})
export class TraineesService {
  // public variables
  public columnData$: BehaviorSubject<
    ITraineesDataCell[]
  > = new BehaviorSubject([]);
  public dateColumns$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public columnNames$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public loading$: Observable<boolean>;
  public items$: Observable<any[]>;
  public totalResults$: Observable<number>;
  public sort$: Observable<ISort>;
  public error$: Observable<string>;
  public navigationLinks$: Observable<any>;

  public cssWarnColumn = {
    columnName: null,
    columnValue: null
  };

  public stateName: string;
  public defaultParams: Params;
  public detailsRoute: string;

  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  /**
   * initialise variables used by trainee tables
   * @param data array for building column data
   * @param dateColumns columns for date time formatting
   * @param params default route parameters
   * @param route url for details view when row is clicked
   */
  public init(
    data: any[][],
    dateColumns: string[],
    params: Params,
    route: string,
    cssWarnColumnName: string,
    cssWarnColumnValue: string
  ) {
    const _cdata = this.generateColumnData(data);
    const _columnNames = _cdata.map((i: ITraineesDataCell) => i.name);

    this.cssWarnColumn.columnName = cssWarnColumnName;
    this.cssWarnColumn.columnValue = cssWarnColumnValue;

    this.defaultParams = params;
    this.detailsRoute = route;
    this.columnNames$.next(_columnNames);
    this.columnData$.next(_cdata);
    this.dateColumns$.next(dateColumns);
  }

  public mergeDefaultParameters(params: Params) {
    return Object.assign({}, this.defaultParams, params);
  }

  public mergeParameters(params: Params, routeParams: Params) {
    return Object.assign({}, params, routeParams);
  }

  public updateRoute(params: Params): Promise<boolean> {
    return this.router.navigate([], {
      queryParams: params
    });
  }

  public navigateToDetails(gmcNumber: number): Promise<boolean> {
    return this.router.navigate([this.detailsRoute, gmcNumber]);
  }

  public sort(event: ISort): void {
    const params = {
      sortColumn: event.active,
      sortOrder: event.direction,
      pageNumber: 0
    };
    const currentParams = this.router.routerState.snapshot.root.queryParams;
    const resetParams = this.mergeParameters(currentParams, params);
    this.updateRoute(resetParams);
  }

  private generateColumnData(data: any[][]): ITraineesDataCell[] {
    const generatedData: ITraineesDataCell[] = [];
    data.forEach((item: any[]) => {
      generatedData.push({
        label: item[0],
        name: item[1],
        enableSort: item[2]
      });
    });
    return generatedData;
  }
}
