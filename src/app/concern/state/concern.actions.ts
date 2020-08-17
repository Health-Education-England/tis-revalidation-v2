import { HttpErrorPayload } from "../../shared/services/error/error.service";
import { IConcernSummary } from "../concern.interfaces";

export class Get {
  static readonly type = "[Concern] Get";
  constructor(public payload: number) {}
}

export class Save {
  static readonly type = "[Concern] Save";
}

export class SaveSuccess {
  static readonly type = "[Concern] Save Success";
  constructor(public payload: any) {}
}

export class Upload {
  static readonly type = "[Concern] Upload";
  constructor(
    public gmcNumber: number,
    public concernId: number,
    public payload: File[]
  ) {}
}

export class UploadSuccess {
  static readonly type = "[Concern] Upload Success";
}

export class ApiError extends HttpErrorPayload {
  static readonly type = "[Concern] Api Error";
}

export class ListFiles {
  static readonly type = "[Concern] List Files";
  constructor(public gmcNumber: number, public concernId: number) {}
}

export class ListFilesSuccess {
  static readonly type = "[Concern] List Files Success";
  constructor(public uploadedFiles: any[]) {}
}

export class DownloadFile {
  static readonly type = "[Concern] Download File";
  constructor(public fileName: string, public key: string) {}
}

export class DownloadFileSuccess {
  static readonly type = "[Concern] Download File Success";
  constructor(public blob: Blob, public fileName: string) {}
}

export class DeleteFile {
  static readonly type = "[Concern] Delete File";
  constructor(public fileName: string, public key: string) {}
}

export class DeleteFileSuccess {
  static readonly type = "[Concern] Delete File Success";
  constructor(public fileName: string) {}
}

export class SetSelectedConcern {
  static readonly type = "[Concern] set selected concern";
  constructor(public concern: IConcernSummary) {}
}

export class SetFileUploadProgress {
  static readonly type = "[Concern] set file upload progress";
  constructor(public upFile?: File, public progress?: number) {}
}
