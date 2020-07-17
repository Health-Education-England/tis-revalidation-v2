import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, finalize, switchMap, take, tap } from "rxjs/operators";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import { IConcernSummary, IGetConcernResponse } from "../concern.interfaces";
import { ConcernService } from "../services/concern/concern.service";
import { UploadService } from "../services/upload/upload.service";
import {
  Get,
  GetFiles,
  Upload,
  ApiError,
  UploadSuccess,
  GetFilesSuccess
} from "./concern.actions";

export class ConcernStateModel {
  public concernId?: number;
  public getFilesInProgress?: boolean;
  public gmcNumber: number;
  public history: IConcernSummary[];
  public selected?: IConcernSummary;
  public uploadedFiles?: any[];
  public uploadInProgress?: boolean;
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
  public static uploadInProgress(state: ConcernStateModel) {
    return state.uploadInProgress;
  }

  @Selector()
  public static getFilesInProgress(state: ConcernStateModel) {
    return state.getFilesInProgress;
  }

  @Selector()
  public static uploadedFiles(state: ConcernStateModel) {
    return state.uploadedFiles;
  }

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
    ctx.patchState({
      uploadInProgress: true
    });

    return this.uploadService
      .upload(
        this.uploadService.generateRequest(action.gmcNumber, action.payload)
      )
      .pipe(
        take(1),
        switchMap(() => ctx.dispatch(new UploadSuccess())),
        catchError((error: HttpErrorResponse) =>
          ctx.dispatch(new ApiError(error))
        ),
        finalize(() =>
          ctx.patchState({
            uploadInProgress: false
          })
        )
      )
      .subscribe();
  }

  @Action(UploadSuccess)
  uploadSuccess(ctx: StateContext<ConcernStateModel>) {
    this.snackBarService.openSnackBar(`Upload success`);
    return ctx.dispatch(new GetFiles(ctx.getState().gmcNumber));
  }

  // TODO move to a generic place so other states can also re use
  @Action(ApiError)
  apiError(ctx: StateContext<ConcernStateModel>, action: ApiError) {
    return this.snackBarService.openSnackBar(`Error: ${action.error.message}`);
  }

  @Action(GetFiles)
  getFiles(ctx: StateContext<ConcernStateModel>, action: GetFiles) {
    ctx.patchState({
      getFilesInProgress: true
    });

    return this.uploadService
      .list(this.uploadService.generateParams(action.gmcNumber))
      .pipe(
        take(1),
        switchMap((response: any[]) =>
          ctx.dispatch(new GetFilesSuccess(response))
        ),
        catchError((error: HttpErrorResponse) =>
          ctx.dispatch(new ApiError(error))
        ),
        finalize(() =>
          ctx.patchState({
            getFilesInProgress: false
          })
        )
      )
      .subscribe();
  }

  @Action(GetFilesSuccess)
  getFilesSuccess(
    ctx: StateContext<ConcernStateModel>,
    action: GetFilesSuccess
  ) {
    return ctx.patchState({
      uploadedFiles: action.uploadedFiles
    });
  }
}
