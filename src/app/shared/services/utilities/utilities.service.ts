import { Injectable } from "@angular/core";
import { RecommendationDueDateStatus } from "../../../recommendation/recommendation-history.interface";
import { IMenuItem } from "../../main-navigation/mat-main-nav/menu-item.interface";
import { AuthService } from "src/app/core/auth/auth.service";
import { environment } from "@environment";

@Injectable({
  providedIn: "root"
})
export class UtilitiesService {
  constructor(private authService: AuthService) {}
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

  showNavigationLink(item: IMenuItem): boolean {
    return (
      (!item.beta || (item.beta && this.authService.isRevalBeta)) &&
      (!item.env || item.env?.includes(environment.name))
    );
  }

  flattenObject(
    obj: Record<string, any>,
    parentKey = "",
    result: Record<string, any> = {}
  ): Record<string, any> {
    for (const key in obj) {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        this.flattenObject(value, newKey, result);
      } else {
        result[newKey] = value;
      }
    }
    return result;
  }
}
