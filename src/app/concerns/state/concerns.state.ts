import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { GetConcerns } from "./concerns.actions";
import { IGetConcernsResponse } from "../concerns.interfaces";
import { ConcernsService } from "../services/concerns.service";
import { map, catchError, finalize } from "rxjs/operators";
import { of } from "rxjs";

export class ConcernsStateModel {
  public item: IGetConcernsResponse;
  public loading: boolean;
  public error?: string;
}

@State<ConcernsStateModel>({
  name: "concerns",
  defaults: {
    loading: false,
    error: null,
    item: {
      countTotal: null,
      totalPages: null,
      totalResults: null,
      concernTrainees: []
    }
  }
})
@Injectable()
export class ConcernsState {
  constructor(private concernsService: ConcernsService) {}

  @Action(GetConcerns)
  get(ctx: StateContext<ConcernsStateModel>, action: GetConcerns) {
    const params = action.payload;
    let httpParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val) {
        httpParams = httpParams.append(key, val);
      }
    });

    ctx.patchState({
      item: null,
      loading: true
    });

    return this.concernsService.getConcerns(httpParams).pipe(
      map((res: IGetConcernsResponse) => {
        ctx.patchState({
          item: res
        });
      }),
      catchError((err: any) => {
        ctx.patchState({
          error: `Error: ${err.message}`
        });
        return of(err);
      }),
      finalize(() =>
        ctx.patchState({
          loading: false
        })
      )
    );
  }
}
