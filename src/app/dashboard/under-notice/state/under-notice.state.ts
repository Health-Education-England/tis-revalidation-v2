import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { ITrainee } from "../../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../../core/trainee/trainee.service";
import { GetUnderNoticeTrainees } from "./under-notice.actions";

export class UnderNoticeStateModel {
  public items: ITrainee[];
}

@State<UnderNoticeStateModel>({
  name: "underNotice",
  defaults: {
    items: []
  }
})
@Injectable()
export class UnderNoticeState {
  constructor(private traineeService: TraineeService) {}

  @Selector()
  static underNoticeTrainees(state: UnderNoticeStateModel) {
    return state.items;
  }

  @Action(GetUnderNoticeTrainees)
  getUnderNoticeTrainees(ctx: StateContext<UnderNoticeStateModel>) {
    return this.traineeService.getUnderNoticeTrainees().pipe(
      tap(result => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          items: result
        });
      })
    );
  }
}
