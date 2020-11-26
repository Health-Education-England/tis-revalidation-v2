import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IDesignatedBody } from "../reference.interfaces";

import { mockDbcs } from "../mock-data/reference-spec.data";

@Injectable({
  providedIn: "root"
})
export class ReferenceService {
  public getDbcs(): Observable<IDesignatedBody[]> {
    return of(mockDbcs);
  }
}
