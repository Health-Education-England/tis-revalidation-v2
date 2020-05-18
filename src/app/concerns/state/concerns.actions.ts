import {
  GetErrorPayload,
  GetSuccessPayload
} from "../../shared/records/state/records.actions";
import { IGetConcernsResponse } from "../concerns.interfaces";

const label = `[Concerns]`;

export class Get {
  static readonly type = `${label} Get`;
}

export class GetSuccess extends GetSuccessPayload<IGetConcernsResponse> {
  static readonly type = `${label} Get Success`;
}

export class GetError extends GetErrorPayload {
  static readonly type = `${label} Get Error`;
}
