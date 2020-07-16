import { HttpClient } from "@angular/common/http";
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

  // TODO placeholder method
  public list(): Observable<any> {
    return of({});
  }

  // TODO placeholder method
  public delete(): Observable<any> {
    return of({});
  }
}
