import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Action, State, StateContext } from "@ngxs/store";
import { RecordsService } from "../../shared/records/services/records.service";
import {
  defaultRecordsState,
  RecordsState,
  RecordsStateModel
} from "../../shared/records/state/records.state";
import {
  Get,
  GetError,
  GetSuccess
} from "../../trainees/state/trainees.actions";
import { ConcernsFilterType, IConcern } from "../concerns.interfaces";
import { ConcernsService } from "../services/concerns.service";

export class ConcernsStateModel extends RecordsStateModel<
  ConcernsFilterType,
  IConcern[]
> {}

@State<ConcernsStateModel>({
  name: "concerns",
  defaults: {
    ...defaultRecordsState
  }
})
@Injectable()
export class ConcernsState extends RecordsState {
  constructor(
    private concernsService: ConcernsService,
    protected recordsService: RecordsService
  ) {
    super(recordsService);
  }

  @Action(Get)
  get(ctx: StateContext<ConcernsStateModel>) {
    const params: HttpParams = this.concernsService.generateParams();
    const endPoint = `${environment.appUrls.getConcerns}`;
    return super.getHandler(ctx, endPoint, params);
  }

  @Action(GetSuccess)
  getSuccess(ctx: StateContext<ConcernsStateModel>, action: GetSuccess) {
    return super.getSuccessHandler(ctx, action);
  }

  @Action(GetError)
  getError(ctx: StateContext<ConcernsStateModel>, action: GetError) {
    return super.getErrorHandler(ctx, action);
  }
}
