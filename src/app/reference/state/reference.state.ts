import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { switchMap, take, catchError } from "rxjs/operators";
import { IDesignatedBody } from "src/app/reference/reference.interfaces";
import { ReferenceService } from "src/app/reference/services/reference.service";
import { GetDesignatedBodies, GetSuccess, GetError } from "./reference.actions";
import { SnackBarService } from "src/app/shared/services/snack-bar/snack-bar.service";

export class ReferenceStateModel {
  public dbcs: IDesignatedBody[];
  public error: any;
}

@State<ReferenceStateModel>({
  name: "reference",
  defaults: {
    dbcs: [],
    error: null
  }
})
@Injectable()
export class ReferenceState {
  constructor(
    private service: ReferenceService,
    private snackBarService: SnackBarService
  ) {}

  @Selector()
  public static Dbcs(state: ReferenceStateModel) {
    return state.dbcs;
  }

  @Selector()
  public static error(state: ReferenceStateModel) {
    return state.error;
  }

  @Action(GetDesignatedBodies)
  getDesignatedBodies(ctx: StateContext<ReferenceStateModel>) {
    return this.service.getDbcs().pipe(
      take(1),
      switchMap((response: IDesignatedBody[]) =>
        ctx.dispatch(new GetSuccess(response))
      ),
      catchError((error: string) => ctx.dispatch(new GetError(error)))
    );
  }

  @Action(GetSuccess)
  getSuccess(ctx: StateContext<ReferenceStateModel>, action: GetSuccess) {
    return ctx.patchState({
      dbcs: action.response
    });
  }

  @Action(GetError)
  getError(ctx: StateContext<ReferenceStateModel>, action: GetError) {
    this.snackBarService.openSnackBar(action.error);
    return ctx.patchState({
      error: action.error
    });
  }
}
