import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Observable, of } from "rxjs";
import { IListFile } from "../../concern.interfaces";
import { FILE_BUCKET_NAME } from "../../constants";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public createUploadRequest(gmcNumber: number, payload: File[]): FormData {
    const formData: FormData = new FormData();
    formData.append("bucketName", FILE_BUCKET_NAME);
    // TODO once we can create a concern (FE & BE work not implemented yet)
    // swap out second gmcNumber with concernId
    formData.append("folderPath", `${gmcNumber}/${gmcNumber}`);
    formData.append("file", payload[0]);
    return formData;
  }

  public upload(payload: FormData): Observable<any> {
    return this.http.post(environment.appUrls.upload, payload);
  }

  public createDownloadFileParams(key: string): HttpParams {
    const params: HttpParams = new HttpParams()
      .set("bucketName", FILE_BUCKET_NAME)
      .set("key", key);

    return params;
  }

  public downloadFile(params: HttpParams): Observable<Blob> {
    return this.http.get(environment.appUrls.downloadFile, {
      params,
      responseType: "blob"
    });
  }

  public createListFilesParams(gmcNumber: number): HttpParams {
    const params: HttpParams = new HttpParams()
      .set("bucketName", FILE_BUCKET_NAME)
      .set("folderPath", `${gmcNumber}/${gmcNumber}`);

    return params;
  }

  public listFiles(params: HttpParams): Observable<IListFile[] | any> {
    return this.http.get(environment.appUrls.listFiles, { params });
  }

  // TODO placeholder method
  public deleteFile(): Observable<any> {
    return of({});
  }
}
