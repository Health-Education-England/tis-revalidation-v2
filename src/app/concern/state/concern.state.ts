import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, switchMap, take, tap } from "rxjs/operators";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import { IConcernSummary, IGetConcernResponse } from "../concern.interfaces";
import { ConcernService } from "../services/concern/concern.service";
import { UploadService } from "../services/upload/upload.service";
import {
  Get,
  GetUploadedFiles,
  Upload,
  UploadError,
  UploadSuccess
} from "./concern.actions";

export class ConcernStateModel {
  public concernId?: number;
  public gmcNumber: number;
  public history: IConcernSummary[];
  public selected?: IConcernSummary;
}

@State<ConcernStateModel>({
  name: "concern",
  defaults: {
    gmcNumber: null,
    history: []
  }
})
@Injectable()
export class ConcernState {
  constructor(
    private service: ConcernService,
    private uploadService: UploadService,
    private snackBarService: SnackBarService
  ) {}

  @Selector()
  public static gmcNumber(state: ConcernStateModel) {
    return state.gmcNumber;
  }

  @Selector()
  public static history(state: ConcernStateModel) {
    return state.history;
  }

  @Selector()
  public static selected(state: ConcernStateModel) {
    return state.selected;
  }

  @Action(Get)
  get({ patchState }: StateContext<ConcernStateModel>, { payload }: Get) {
    if (isNaN(payload)) {
      throw new Error(`gmcNumber ${payload} must be of type number`);
    }

    return this.service.getConcernHistory(payload).pipe(
      tap((response: IGetConcernResponse) =>
        patchState({
          gmcNumber: response.gmcNumber || payload,
          history: response.concerns
        })
      )
    );
  }

  @Action(Upload)
  upload(ctx: StateContext<ConcernStateModel>, action: Upload) {
    return this.uploadService
      .upload(
        this.uploadService.generateRequest(action.gmcNumber, action.payload)
      )
      .pipe(
        take(1),
        switchMap(() => ctx.dispatch(new UploadSuccess())),
        catchError((error: HttpErrorResponse) =>
          ctx.dispatch(new UploadError(error))
        )
      )
      .subscribe();
  }

  @Action(UploadSuccess)
  uploadSuccess(ctx: StateContext<ConcernStateModel>) {
    this.snackBarService.openSnackBar(`Upload success`);
    return ctx.dispatch(new GetUploadedFiles());
  }

  @Action(UploadError)
  uploadError(ctx: StateContext<ConcernStateModel>, action: UploadError) {
    return this.snackBarService.openSnackBar(`Error: ${action.error.message}`);
  }
}
