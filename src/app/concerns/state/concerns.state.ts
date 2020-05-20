import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";
import {
  defaultRecordsState,
  RecordsState,
  RecordsStateModel
} from "../../shared/records/state/records.state";
import { ConcernsFilterType, IConcern } from "../concerns.interfaces";

export class ConcernsStateModel extends RecordsStateModel<
  ConcernsFilterType,
  IConcern[]
> {}

@State<ConcernsStateModel>({
  name: "concerns",
  defaults: {
    ...defaultRecordsState
  }
})
@Injectable()
export class ConcernsState extends RecordsState {}
