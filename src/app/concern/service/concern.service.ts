import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IConcernHistory } from "../concern-history.interface";
import { Observable } from "rxjs";
import { environment } from "@environment";

@Injectable({
  providedIn: "root"
})
export class ConcernService {
  constructor(private http: HttpClient) {}

  getConcernHistory(gmcNumber: number): Observable<IConcernHistory | any> {
    return this.http.get<IConcernHistory>(
      `${environment.appUrls.getConcern}/${gmcNumber}`
    );
  }

  uploadFiles(formData: FormData) {
    return this.http.post(environment.appUrls.uploadConcernDocuments, formData);
  }
}
