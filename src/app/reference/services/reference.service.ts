import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IDesignatedBody } from "../reference.interfaces";
import { environment } from "@environment";

@Injectable({
  providedIn: "root"
})
export class ReferenceService {
  constructor(private http: HttpClient) {}

  public getDbcs(): Observable<IDesignatedBody[]> {
    return this.http.get<IDesignatedBody[]>(`${environment.appUrls.getDbcs}`);
  }
}
