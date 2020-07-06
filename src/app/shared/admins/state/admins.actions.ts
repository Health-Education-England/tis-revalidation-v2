import { HttpErrorResponse } from "@angular/common/http";
import { UserType } from "aws-sdk/clients/cognitoidentityserviceprovider";

const label = `[Admins]`;

export class Get {
  static readonly type = `${label} Get`;
  constructor(public groupName: string) {}
}

export class GetSuccess {
  static readonly type = `${label} Get Success`;
  constructor(public response: UserType[]) {}
}

export class GetError {
  static readonly type = `${label} Get Error`;
  constructor(public error: string) {}
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

export class SubmitAllocateListError {
  static readonly type = `${label} Submit Allocate List Error`;
  constructor(public error: HttpErrorResponse) {}
}
