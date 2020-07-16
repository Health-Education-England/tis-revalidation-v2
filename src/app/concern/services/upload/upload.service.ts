import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public generateRequest(gmcNumber: number, payload: File[]): FormData {
    const formData: FormData = new FormData();
    formData.append("bucketName", "tis-test-bucket-2020");
    // TODO once we can create a concern (FE & BE work not implemented yet)
    // swap out second gmcNumber with concernId
    formData.append("folderPath", `${gmcNumber}/${gmcNumber}`);
    formData.append("file", payload[0]);
    return formData;
  }

  public upload(payload: FormData): Observable<any> {
    return this.http.post(environment.appUrls.fileUpload, payload);
  }

  // TODO placeholder method
  public download(): Observable<any> {
    return of({});
  }

  public generateParams(gmcNumber: number): HttpParams {
    const params: HttpParams = new HttpParams()
      .set("bucketName", "tis-test-bucket-2020")
      .set("folderPath", `${gmcNumber}/${gmcNumber}`);

    return params;
  }

  public list(params: HttpParams): Observable<any> {
    return this.http.get(environment.appUrls.fileList, { params });
  }

  // TODO placeholder method
  public delete(): Observable<any> {
    return of({});
  }
}
