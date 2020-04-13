import { ITraineeRouteParams } from "../trainees.interface";

/**
 * get doctors using pageNumber, sort, filters, search etc
 */
export class GetTrainees {
  static readonly type = "[Trainees] Get";
  constructor(public payload: ITraineeRouteParams) {}
}
