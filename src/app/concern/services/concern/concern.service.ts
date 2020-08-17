import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { BehaviorSubject, Observable } from "rxjs";
import {
  IAddConcernRequest,
  IConcernSummary,
  IGetConcernResponse
} from "../../concern.interfaces";

@Injectable({
  providedIn: "root"
})
export class ConcernService {
  public isConcernDetailFormValid: BehaviorSubject<
    boolean
  > = new BehaviorSubject(false);
  public isTraineeDetailFormValid: BehaviorSubject<
    boolean
  > = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  getConcernHistory(gmcNumber: number): Observable<IGetConcernResponse | any> {
    return this.http.get<IGetConcernResponse>(
      `${environment.appUrls.getConcern}/${gmcNumber}`
    );
  }

  /**
   * This method is needed to massage the POST request data
   * i.e BE is sending different data type in the GET api
   * and expect different data type on the POST api
   * `employer, grade & site` fields are conditionally added as per there validation rules
   * @param payload - IAddConcernRequest
   */
  public generatePayload(payload: IConcernSummary): IAddConcernRequest {
    return {
      ...payload,
      employer: payload.employer
        ? {
            id: payload.employer.id,
            label: payload.employer.trustName
          }
        : undefined,
      grade: payload.grade
        ? {
            id: payload.grade.id,
            label: payload.grade.name
          }
        : undefined,
      site: payload.site
        ? {
            id: payload.site.id,
            label: payload.site.siteName
          }
        : undefined,
      source: {
        id: payload.source.id,
        label: payload.source.name
      },
      concernType: {
        id: payload.concernType.id,
        label: payload.concernType.label
      }
    };
  }

  public addConcern(payload: IConcernSummary): Observable<any> {
    return this.http.post<any>(
      environment.appUrls.addConcern,
      this.generatePayload(payload)
    );
  }
}
