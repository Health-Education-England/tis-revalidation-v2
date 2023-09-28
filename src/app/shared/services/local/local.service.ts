import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { stringify } from "querystring";
export interface CustomLocalData {
  version: string;
  connectionsTableColumns?: string[];
  recommendationsTableColumns?: string[];
}

@Injectable({
  providedIn: "root"
})
export class LocalService {
  public customLocalData: CustomLocalData;

  public initCustomData() {
    const initLocalData: CustomLocalData = {
      version: environment.appVersion,
      connectionsTableColumns: [],
      recommendationsTableColumns: []
    };

    const revalCustomData: CustomLocalData = JSON.parse(
      this.getData("RevalCustomData")
    );
    if (
      !revalCustomData ||
      revalCustomData.version !== environment.appVersion
    ) {
      this.customLocalData = initLocalData;
      this.saveData("RevalCustomData", JSON.stringify(initLocalData));
    } else {
      this.customLocalData = revalCustomData;
    }
  }

  updateCustomData(key: string, value: string | string[]) {
    this.customLocalData[key] = value;
    this.saveData("RevalCustomData", JSON.stringify(this.customLocalData));
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
