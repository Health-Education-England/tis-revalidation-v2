import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { BehaviorSubject, Observable } from "rxjs";
import {
  Get as GetConcerns,
  Paginate as PaginateConcerns,
  ResetPaginator as ResetConcernsPaginator,
  ResetSort as ResetConcernsSort,
  Search as ConcernsSearch,
  Sort as SortConcerns
} from "../../../concerns/state/concerns.actions";
import {
  Get as GetTrainees,
  Paginate as PaginateTrainees,
  ResetPaginator as ResetTraineesPaginator,
  ResetSort as ResetTraineesSort,
  Search as TraineesSearch,
  Sort as SortTrainees
} from "../../../trainees/state/trainees.actions";

@Injectable({
  providedIn: "root"
})
export class RecordsService {
  public resetSearchForm$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public stateName: string;

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient
  ) {}

  public get isTraineesState(): boolean {
    return this.stateName === "trainees";
  }

  public get isConcernsState(): boolean {
    return this.stateName === "concerns";
  }

  public getRecords<T>(endPoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(endPoint, { params });
  }

  public generateParams(snapshot: any): HttpParams {
    let params: HttpParams = new HttpParams()
      .set("sortColumn", snapshot.sort.active)
      .set("sortOrder", snapshot.sort.direction)
      .set("pageNumber", snapshot.pageIndex.toString());

    if (snapshot.searchQuery) {
      params = params.append("searchQuery", snapshot.searchQuery);
    }

    return params;
  }

  public updateRoute(route: string): Promise<boolean> {
    const snapshot: any = this.store.snapshot()[route];

    return this.router.navigate([route], {
      queryParams: {
        active: snapshot.sort.active,
        direction: snapshot.sort.direction,
        pageIndex: snapshot.pageIndex,
        filter: snapshot.filter,
        ...(snapshot.searchQuery && { searchQuery: snapshot.searchQuery })
      }
    });
  }

  public get(): Observable<any> {
    if (this.isTraineesState) {
      return this.store.dispatch(new GetTrainees());
    } else if (this.isConcernsState) {
      return this.store.dispatch(new GetConcerns());
    }
  }

  public sort(active: string, direction): void {
    if (this.isTraineesState) {
      this.store.dispatch(new SortTrainees(active, direction));
    } else if (this.isConcernsState) {
      this.store.dispatch(new SortConcerns(active, direction));
    }
  }

  public resetSort(): void {
    if (this.isTraineesState) {
      this.store.dispatch(new ResetTraineesSort());
    } else if (this.isConcernsState) {
      this.store.dispatch(new ResetConcernsSort());
    }
  }

  public paginate(pageIndex: number): void {
    if (this.isTraineesState) {
      this.store.dispatch(new PaginateTrainees(pageIndex));
    } else if (this.isConcernsState) {
      this.store.dispatch(new PaginateConcerns(pageIndex));
    }
  }

  public resetPaginator(): void {
    if (this.isTraineesState) {
      this.store.dispatch(new ResetTraineesPaginator());
    } else if (this.isConcernsState) {
      this.store.dispatch(new ResetConcernsPaginator());
    }
  }

  public search(searchQuery: string): void {
    if (this.isTraineesState) {
      this.store.dispatch(new TraineesSearch(searchQuery));
    } else if (this.isConcernsState) {
      this.store.dispatch(new ConcernsSearch(searchQuery));
    }
  }
}
