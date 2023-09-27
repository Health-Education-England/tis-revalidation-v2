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
  constructor() {}

  public initCustomData() {
    const initLocalData: CustomLocalData = {
      version: environment.appVersion,
      connectionsTableColumns: [],
      recommendationsTableColumns: []
    };
    this.saveData("RevalCustomData", JSON.stringify(initLocalData));
  }

  updateCustomData(key: string, value: string | string[]) {
    const updated = Object.assign({}, this.customLocalData, { [key]: value });
    this.saveData("RevalCustomData", JSON.stringify(updated));
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public customLocalData: CustomLocalData = JSON.parse(
    this.getData("RevalCustomData")
  );

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
