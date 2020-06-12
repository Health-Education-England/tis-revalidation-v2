import { State, Action, StateContext, Selector } from "@ngxs/store";
import { GetRecommendationNotes } from "./recommendation-notes.actions";
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { RecommendationNotesService } from "../services/recommendation-notes.service";
import { INote } from "../recommendation-history.interface";

export class RecommendationNotesStateModel {
  public items: INote[];
}

@State<RecommendationNotesStateModel>({
  name: "recommendationNotes",
  defaults: {
    items: []
  }
})
@Injectable()
export class RecommendationNotesState {
  constructor(private service: RecommendationNotesService) {}

  @Selector()
  public static recommendationNotes(state: RecommendationNotesStateModel) {
    return state.items;
  }

  @Action(GetRecommendationNotes, { cancelUncompleted: true })
  get(
    ctx: StateContext<RecommendationNotesStateModel>,
    action: GetRecommendationNotes
  ) {
    const httpParam: HttpParams = new HttpParams().set(
      "id",
      action.payload.toString()
    );

    return this.service.getRecommendationNotes(httpParam).pipe(
      tap((result: INote[]) => {
        ctx.patchState({
          items: result
        });
      })
    );
  }
}
