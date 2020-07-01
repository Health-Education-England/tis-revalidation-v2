import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UserType } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { AdminsService } from "../services/admins.service";
import { Get, GetError, GetSuccess } from "./admins.actions";

export class AdminsStateModel {
  public error?: string;
  public items: UserType[];
}

@State<AdminsStateModel>({
  name: "admins",
  defaults: {
    items: null
  }
})
@Injectable()
export class AdminsState {
  constructor(protected adminsService: AdminsService) {}

  @Selector()
  public static items(state: AdminsStateModel) {
    return state.items;
  }

  @Selector()
  public static error(state: AdminsStateModel) {
    return state.error;
  }

  @Action(Get)
  get(ctx: StateContext<AdminsStateModel>, action: Get) {
    return this.adminsService.getAdminUsers(action.groupName);
  }

  @Action(GetSuccess)
  getSuccess(ctx: StateContext<AdminsStateModel>, action: GetSuccess) {
    return ctx.patchState({
      items: action.response
    });
  }

  @Action(GetError)
  getError(ctx: StateContext<AdminsStateModel>, action: GetError) {
    return ctx.patchState({
      error: action.error
    });
  }
}
