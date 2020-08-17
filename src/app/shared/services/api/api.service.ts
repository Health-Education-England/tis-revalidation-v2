import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  public getEnumKey(enumList: any, enumValue: any): string {
    return Object.entries(enumList).filter((item: any[]) =>
      item.includes(enumValue)
    )[0][0];
  }
}
