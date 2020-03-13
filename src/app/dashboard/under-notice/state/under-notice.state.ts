import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { ITrainee } from "../../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../../core/trainee/trainee.service";
import { GetUnderNoticeTrainees } from "./under-notice.actions";

export class UnderNoticeStateModel {
  public items: ITrainee[];
  public loading: boolean;
}

@State<UnderNoticeStateModel>({
  name: "underNotice",
  defaults: {
    items: null,
    loading: true
  }
})
@Injectable()
export class UnderNoticeState {
  constructor(private traineeService: TraineeService) {}

  @Selector()
  public static underNoticeTrainees(state: UnderNoticeStateModel) {
    return state.items;
  }

  @Selector()
  public static loading(state: UnderNoticeStateModel) {
    return state.loading;
  }

  @Action(GetUnderNoticeTrainees)
  getUnderNoticeTrainees(ctx: StateContext<UnderNoticeStateModel>) {
    return this.traineeService.getUnderNoticeTrainees().pipe(
      tap(result => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          items: result,
          loading: false
        });
      })
    );
  }
}
