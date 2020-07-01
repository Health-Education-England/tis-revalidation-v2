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
