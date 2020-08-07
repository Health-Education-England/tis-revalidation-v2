import { HttpErrorPayload } from "../../shared/services/error/error.service";
import { IAdmin } from "../admins.interfaces";

const label = `[Admins]`;

export class Get {
  static readonly type = `${label} Get`;
}

export class GetSuccess {
  static readonly type = `${label} Get Success`;
  constructor(public response: IAdmin[]) {}
}

export class GetError extends HttpErrorPayload {
  static readonly type = `${label} Get Error`;
}

export class AddToAllocateList {
  static readonly type = `${label} Add To Allocate List`;
  constructor(public admin: string, public gmcNumber: number) {}
}

export class RemoveFromAllocateList {
  static readonly type = `${label} Remove From Allocate List`;
  constructor(public admin: string, public gmcNumber: number) {}
}

export class ClearAllocateList {
  static readonly type = `${label} Clear Allocate List`;
}

export class SubmitAllocateList {
  static readonly type = `${label} Submit Allocate List`;
}

export class SubmitAllocateListSuccess {
  static readonly type = `${label} Submit Allocate List Success`;
  constructor(public response: any) {}
}

export class SubmitAllocateListError extends HttpErrorPayload {
  static readonly type = `${label} Submit Allocate List Error`;
}
