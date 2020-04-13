import { State, Action, StateContext, Selector } from "@ngxs/store";
import { GetTrainees } from "./trainees.actions";
import {
  ITrainee,
  ITraineeRouteParams,
  DefaultRouteParams
} from "../trainees.interface";
import { HttpParams } from "@angular/common/http";
import { TraineesService } from "../trainees.service";
import { tap, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

export class TraineesStateModel {
  public items: ITrainee[];
  public countTotal: number;
  public countUnderNotice: number;
  public totalPages: number;
  public params: ITraineeRouteParams;
}

export class TraineeStateModel {
  public items: ITrainee;
  public params: number;
}

@State<TraineesStateModel>({
  name: "doctors",
  defaults: {
    items: [],
    countTotal: null,
    countUnderNotice: null,
    totalPages: null,
    params: DefaultRouteParams
  }
})
@Injectable()
export class TraineesState {
  constructor(private doctorsService: TraineesService) {}

  @Selector()
  public static countTotal(state: TraineesStateModel) {
    return state.countTotal;
  }

  @Selector()
  public static countUnderNotice(state: TraineesStateModel) {
    return state.countUnderNotice;
  }

  @Action(GetTrainees, { cancelUncompleted: true })
  get(ctx: StateContext<TraineesStateModel>, action: GetTrainees) {
    const state = ctx.getState();
    let params = new HttpParams();

    if (action.payload.underNotice !== null) {
      params = params.append(
        "underNotice",
        action.payload.underNotice.toString()
      );
    }
    if (action.payload.pageNumber !== null) {
      params = params.append(
        "pageNumber",
        action.payload.pageNumber.toString()
      );
    }
    if (action.payload.search !== null) {
      params = params.append("search", action.payload.search);
    }
    if (action.payload.sortColumn !== null) {
      params = params.append("sortColumn", action.payload.sortColumn);
    }
    if (action.payload.sortOrder !== null) {
      params = params.append("sortOrder", action.payload.sortOrder);
    }

    return this.doctorsService.getTrainees(params).pipe(
      tap((result) => {
        ctx.setState({
          ...state,
          items: result.traineeInfo,
          countTotal: result.countTotal,
          countUnderNotice: result.countUnderNotice,
          totalPages: result.totalPages,
          params: action.payload
        });
      }),
      catchError(() => of([]))
    );
  }
}
