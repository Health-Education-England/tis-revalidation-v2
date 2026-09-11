import { Injectable } from "@angular/core";
import { RecommendationDueDateStatus } from "../../../recommendation/recommendation-history.interface";
import { IMenuItem } from "../../main-navigation/mat-main-nav/menu-item.interface";
import { AuthService } from "src/app/core/auth/auth.service";
import { environment } from "@environment";

@Injectable({
  providedIn: "root"
})
export class UtilitiesService {
  constructor(private readonly authService: AuthService) {}
  private convertToDays(millisecs: number) {
    return Math.round(millisecs / 1000 / 60 / 60 / 24);
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
    const hasMatchingRole =
      !item.roles ||
      item.roles.length === 0 ||
      item.roles.some((role) => this.authService.roles?.includes(role));

    return (
      hasMatchingRole &&
      (!item.beta || (item.beta && this.authService.isRevalBeta)) &&
      (!item.env || item.env?.includes(environment.name))
    );
  }

  filterMenuItems(items: IMenuItem[]): IMenuItem[] {
    return items
      .filter((item) => this.showNavigationLink(item))
      .map((item) => ({
        ...item,
        menuItems: item.menuItems
          ? this.filterMenuItems(item.menuItems)
          : item.menuItems
      }));
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
