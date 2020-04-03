import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { ITrainee } from "../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../core/trainee/trainee.service";
import { GetTrainees, SortTrainees } from "./trainees.actions";

export class TraineesStateModel {
  public items: ITrainee[];
  public count: number;
  public loading: boolean;
  public sort: Sort;
}

@State<TraineesStateModel>({
  name: "trainees",
  defaults: {
    items: null,
    count: null,
    loading: true,
    sort: {
      active: null,
      direction: null
    }
  }
})
@Injectable()
export class TraineesState {
  constructor(private traineeService: TraineeService) {}

  @Selector()
  public static trainees(state: TraineesStateModel) {
    return state.items;
  }

  @Selector()
  public static loading(state: TraineesStateModel) {
    return state.loading;
  }

  @Selector()
  public static sort(state: TraineesStateModel) {
    return state.sort;
  }

  @Selector()
  public static count(state: TraineesStateModel) {
    return state.count;
  }

  @Action(GetTrainees)
  getTrainees(ctx: StateContext<TraineesStateModel>) {
    const state = ctx.getState();
    let params = new HttpParams();

    if (state.sort.direction) {
      params = params
        .append("sortColumn", state.sort.active)
        .append("sortOrder", state.sort.direction);
    }

    return this.traineeService.getTrainees(params).pipe(
      tap((result) => {
        ctx.setState({
          ...state,
          items: result.traineeInfo,
          count: result.count,
          loading: false
        });
      })
    );
  }

  @Action(SortTrainees)
  sortTrainees(ctx: StateContext<TraineesStateModel>, action: SortTrainees) {
    const state = ctx.getState();
    return ctx.setState({
      ...state,
      items: null,
      loading: true,
      sort: {
        active: action.column,
        direction: action.direction
      }
    });
  }
}
