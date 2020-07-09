import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public upload(formData: FormData): Observable<any> {
    return this.http.post(environment.appUrls.uploadConcernDocuments, formData);
  }

  // TODO placeholder method
  public download(): Observable<any> {
    return of({});
  }

  // TODO placeholder method
  public list(): Observable<any> {
    return of({});
  }

  // TODO placeholder method
  public delete(): Observable<any> {
    return of({});
  }
}
