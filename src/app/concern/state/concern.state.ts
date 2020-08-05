import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import {
  catchError,
  finalize,
  switchMap,
  take,
  tap,
  map
} from "rxjs/operators";
import { SnackBarService } from "../../shared/services/snack-bar/snack-bar.service";
import {
  IConcernSummary,
  IGetConcernResponse,
  IListFile,
  IFileUploadProgress
} from "../concern.interfaces";
import { ConcernService } from "../services/concern/concern.service";
import { UploadService } from "../services/upload/upload.service";
import {
  Get,
  ListFiles,
  Upload,
  ApiError,
  UploadSuccess,
  ListFilesSuccess,
  DownloadFile,
  DownloadFileSuccess,
  DeleteFile,
  DeleteFileSuccess,
  SetSelectedConcern
} from "./concern.actions";
import { saveAs } from "file-saver";
import {
  HttpEvent,
  HttpEventType,
  HttpProgressEvent,
  HttpResponse
} from "@angular/common/http";
import { forkJoin, Observable, of } from "rxjs";
import { updateItem, append, patch } from "@ngxs/store/operators";

export class ConcernStateModel {
  public concernId?: number;
  public gmcNumber: number;
  public history: IConcernSummary[];
  public listFilesInProgress?: boolean;
  public selected?: IConcernSummary;
  public uploadedFiles?: any[];
  public uploadFileInProgress?: boolean;
  public filesInUploadProgress?: IFileUploadProgress[];
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
  public static uploadFileInProgress(state: ConcernStateModel) {
    return state.uploadFileInProgress;
  }

  @Selector()
  public static listFilesInProgress(state: ConcernStateModel) {
    return state.listFilesInProgress;
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

  @Selector()
  public static filesInUploadProgress(state: ConcernStateModel) {
    return state.filesInUploadProgress;
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

  @Action(SetSelectedConcern)
  setSelected(
    { patchState }: StateContext<ConcernStateModel>,
    { concern }: SetSelectedConcern
  ) {
    patchState({
      selected: concern
    });
  }

  @Action(Upload)
  upload(ctx: StateContext<ConcernStateModel>, action: Upload) {
    const uploadFiles: Observable<any>[] = [];
    ctx.patchState({
      uploadFileInProgress: true,
      filesInUploadProgress: []
    });

    action.payload.map((upFile: File) => {
      const state = ctx.getState();

      ctx.patchState({
        filesInUploadProgress: [
          ...state.filesInUploadProgress,
          { file: upFile, progress: 0 }
        ]
      });

      uploadFiles.push(
        this.uploadService
          .upload(
            this.uploadService.createFormData(
              action.gmcNumber,
              action.concernId,
              upFile
            )
          )
          .pipe(
            map((event: HttpEvent<HttpProgressEvent>) => {
              switch (event.type) {
                case HttpEventType.UploadProgress:
                  ctx.setState(
                    patch({
                      filesInUploadProgress: updateItem<IFileUploadProgress>(
                        (item) => item.file === upFile,
                        {
                          file: upFile,
                          progress: Math.round(
                            (event.loaded * 100) / event.total
                          )
                        }
                      )
                    })
                  );
                  break;
                case HttpEventType.Response:
                  return event;
              }
            })
          )
      );
    });

    return forkJoin(uploadFiles)
      .pipe(
        take(1),
        tap((val: HttpResponse<any>[]) => {
          if (val.includes(undefined)) {
            ctx.dispatch(new UploadSuccess());
            this.snackBarService.openSnackBar(`An error occured`);
            return of(null);
          }
          return ctx.dispatch(new UploadSuccess());
        }),
        catchError((error: string) => {
          return ctx.dispatch(new ApiError(error));
        }),
        finalize(() =>
          ctx.patchState({
            uploadFileInProgress: false
          })
        )
      )
      .subscribe();
  }

  @Action(UploadSuccess)
  uploadSuccess(ctx: StateContext<ConcernStateModel>) {
    this.snackBarService.openSnackBar(`Upload success`);
    const gmcno = ctx.getState().gmcNumber;
    const conId = ctx.getState().selected?.concernId || gmcno;
    return ctx.dispatch(new ListFiles(gmcno, conId));
  }

  // TODO move to a generic place so other states can also re use
  @Action(ApiError)
  apiError(action: ApiError) {
    return this.snackBarService.openSnackBar(action.error);
  }

  @Action(ListFiles)
  listFiles(ctx: StateContext<ConcernStateModel>, action: ListFiles) {
    ctx.patchState({
      listFilesInProgress: true
    });

    return this.uploadService
      .listFiles(
        this.uploadService.createListFilesParams(
          action.gmcNumber,
          action.concernId
        )
      )
      .pipe(
        take(1),
        switchMap((response: IListFile[]) =>
          ctx.dispatch(new ListFilesSuccess(response))
        ),
        catchError((error: string) => ctx.dispatch(new ApiError(error))),
        finalize(() =>
          ctx.patchState({
            listFilesInProgress: false
          })
        )
      )
      .subscribe();
  }

  @Action(ListFilesSuccess)
  listFilesSuccess(
    ctx: StateContext<ConcernStateModel>,
    action: ListFilesSuccess
  ) {
    return ctx.patchState({
      uploadedFiles: action.uploadedFiles
    });
  }

  @Action(DownloadFile)
  downloadFile(ctx: StateContext<ConcernStateModel>, action: DownloadFile) {
    return this.uploadService
      .downloadFile(this.uploadService.createRequestParams(action.key))
      .pipe(
        take(1),
        switchMap((blob: Blob) =>
          ctx.dispatch(new DownloadFileSuccess(blob, action.fileName))
        ),
        catchError((error: string) => ctx.dispatch(new ApiError(error)))
      )
      .subscribe();
  }

  @Action(DownloadFileSuccess)
  downloadFileSuccess(action: DownloadFileSuccess) {
    saveAs(action.blob, action.fileName);
  }

  @Action(DeleteFile)
  deleteFile(ctx: StateContext<ConcernStateModel>, action: DeleteFile) {
    return this.uploadService
      .deleteFile(this.uploadService.createRequestParams(action.key))
      .pipe(
        take(1),
        switchMap(() => ctx.dispatch(new DeleteFileSuccess(action.fileName))),
        catchError((error: string) => ctx.dispatch(new ApiError(error)))
      )
      .subscribe();
  }

  @Action(DeleteFileSuccess)
  deleteFileSuccess(
    ctx: StateContext<ConcernStateModel>,
    action: DeleteFileSuccess
  ) {
    this.snackBarService.openSnackBar(`${action.fileName} has been deleted`);
    const gmcno = ctx.getState().gmcNumber;
    const conId = ctx.getState().selected?.concernId || gmcno;
    return ctx.dispatch(new ListFiles(gmcno, conId));
  }
}
