import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";

export class ConcernsStateModel {
  public items: string[];
}

@State<ConcernsStateModel>({
  name: "concerns",
  defaults: {
    items: []
  }
})
@Injectable()
export class ConcernsState {}
