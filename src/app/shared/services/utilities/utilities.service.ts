import { Injectable } from "@angular/core";
import { RecommendationDueDateStatus } from "../../../recommendation/recommendation-history.interface";

@Injectable({
  providedIn: "root"
})
export class UtilitiesService {
  private convertToDays(milisecs: number) {
    return Math.round(milisecs / 1000 / 60 / 60 / 24);
  }

  getDueDateStatus(
    dueDate: Date,
    warningPeriodInDays: number = 14
  ): RecommendationDueDateStatus {
    const dueDateAsTime = new Date(dueDate).getTime();
    const nowAsTime = new Date().getTime();
    const diffInDays = this.convertToDays(dueDateAsTime - nowAsTime);
    if (diffInDays < 0) {
      return RecommendationDueDateStatus.PAST;
    } else if (diffInDays < warningPeriodInDays && diffInDays >= 0) {
      return RecommendationDueDateStatus.WARNING;
    } else {
      return RecommendationDueDateStatus.FUTURE;
    }
  }
}
