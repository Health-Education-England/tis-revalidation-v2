import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { append, patch, removeItem } from "@ngxs/store/operators";
import { catchError, switchMap, take } from "rxjs/operators";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import { IAdmin, IAllocateAdmin } from "../admins.interfaces";
import { AdminsService } from "../services/admins.service";
import {
  AddToAllocateList,
  ClearAllocateList,
  Get,
  GetError,
  GetSuccess,
  RemoveFromAllocateList,
  SubmitAllocateList,
  SubmitAllocateListError,
  SubmitAllocateListSuccess
} from "./admins.actions";

export class AdminsStateModel {
  public error?: string;
  public items: IAdmin[];
  public allocateList: IAllocateAdmin[];
}

@State<AdminsStateModel>({
  name: "admins",
  defaults: {
    items: null,
    allocateList: []
  }
})
@Injectable()
export class AdminsState {
  constructor(
    private adminsService: AdminsService,
    private snackBarService: SnackBarService
  ) {}

  @Selector()
  public static items(state: AdminsStateModel) {
    return state.items;
  }

  @Selector()
  public static error(state: AdminsStateModel) {
    return state.error;
  }

  @Action(Get)
  get(ctx: StateContext<AdminsStateModel>) {
    return this.adminsService.getAdminUsers().pipe(
      take(1),
      switchMap((response: IAdmin[]) => ctx.dispatch(new GetSuccess(response))),
      catchError((error: string) => ctx.dispatch(new GetError(error)))
    );
  }

  @Action(GetSuccess)
  getSuccess(ctx: StateContext<AdminsStateModel>, action: GetSuccess) {
    return ctx.patchState({
      items: action.response
    });
  }

  @Action(GetError)
  getError(ctx: StateContext<AdminsStateModel>, action: GetError) {
    this.snackBarService.openSnackBar(action.error);
    return ctx.patchState({
      error: action.error
    });
  }

  @Action(AddToAllocateList)
  addToAllocateList(
    ctx: StateContext<AdminsStateModel>,
    action: AddToAllocateList
  ) {
    const allocateList: IAllocateAdmin[] = ctx.getState().allocateList;
    const alreadyExists: boolean = !!allocateList.filter(
      (item: IAllocateAdmin) => item.gmcNumber === action.gmcNumber
    ).length;

    if (!alreadyExists) {
      return ctx.setState(
        patch({
          allocateList: append([action])
        })
      );
    }
  }

  @Action(RemoveFromAllocateList)
  removeFromAllocateList(
    ctx: StateContext<AdminsStateModel>,
    action: RemoveFromAllocateList
  ) {
    return ctx.setState(
      patch({
        allocateList: removeItem((item: IAllocateAdmin) => item === action)
      })
    );
  }

  @Action(ClearAllocateList)
  clearAllocateList(ctx: StateContext<AdminsStateModel>) {
    return ctx.patchState({
      allocateList: []
    });
  }

  @Action(SubmitAllocateList)
  submitAllocateList(ctx: StateContext<AdminsStateModel>) {
    return this.adminsService
      .submitAllocateList(ctx.getState().allocateList)
      .pipe(
        take(1),
        switchMap((response: any) =>
          ctx.dispatch(new SubmitAllocateListSuccess(response))
        ),
        catchError((error: string) =>
          ctx.dispatch(new SubmitAllocateListError(error))
        )
      );
  }

  @Action(SubmitAllocateListSuccess)
  submitAllocateListSuccess(ctx: StateContext<AdminsStateModel>) {
    return ctx.dispatch(new ClearAllocateList());
  }

  @Action(SubmitAllocateListError)
  submitAllocateListError(
    ctx: StateContext<AdminsStateModel>,
    action: SubmitAllocateListError
  ) {
    return ctx.patchState({
      error: action.error
    });
  }
}
