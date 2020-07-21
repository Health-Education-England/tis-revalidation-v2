import { HttpErrorPayload } from "../../shared/services/http-error/http-error.service";
import { IConcernSummary } from "../concern.interfaces";

export class Get {
  static readonly type = "[Concern] Get";
  constructor(public payload: number) {}
}

export class Set {
  static readonly type = "[Concern] Set";
  constructor(public payload: IConcernSummary) {}
}

export class Add {
  static readonly type = "[Concern] Add";
  constructor(public payload: IConcernSummary) {}
}

export class Post {
  static readonly type = "[Concern] Post";
  constructor(public gmcNumber: number, public concernId: string) {}
}

export class Upload {
  static readonly type = "[Concern] Upload";
  constructor(public gmcNumber: number, public payload: File[]) {}
}

export class UploadSuccess {
  static readonly type = "[Concern] Upload Success";
}

export class ApiError extends HttpErrorPayload {
  static readonly type = "[Concern] Api Error";
}

export class ListFiles {
  static readonly type = "[Concern] List Files";
  constructor(public gmcNumber: number) {}
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
