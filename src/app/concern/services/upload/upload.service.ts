import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Observable } from "rxjs";
import { IListFile } from "../../concern.interfaces";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public createFormData(gmcNumber: number, payload: File[]): FormData {
    const formData: FormData = new FormData();
    formData.append("bucketName", environment.awsConfig.bucketName);
    // TODO once we can create a concern (FE & BE work not implemented yet)
    // swap out second gmcNumber with concernId
    formData.append("folderPath", `${gmcNumber}/${gmcNumber}`);
    formData.append("file", payload[0]);
    return formData;
  }

  public upload(payload: FormData): Observable<any> {
    return this.http.post(environment.appUrls.upload, payload);
  }

  public createRequestParams(key: string): HttpParams {
    const params: HttpParams = new HttpParams()
      .set("bucketName", environment.awsConfig.bucketName)
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
      .set("bucketName", environment.awsConfig.bucketName)
      .set("folderPath", `${gmcNumber}/${gmcNumber}`);

    return params;
  }

  public listFiles(params: HttpParams): Observable<IListFile[] | any> {
    return this.http.get(environment.appUrls.listFiles, { params });
  }

  public deleteFile(params: HttpParams): Observable<any> {
    return this.http.delete(environment.appUrls.deleteFile, { params });
  }
}
