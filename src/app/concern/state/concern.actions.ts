import { HttpErrorResponse } from "@angular/common/http";
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

export class ApiError {
  static readonly type = "[Concern] Api Error";
  constructor(public error: HttpErrorResponse) {}
}

export class GetFiles {
  static readonly type = "[Concern] Get Files";
  constructor(public gmcNumber: number) {}
}

export class GetFilesSuccess {
  static readonly type = "[Concern] Get Files Success";
  constructor(public uploadedFiles: any[]) {}
}
