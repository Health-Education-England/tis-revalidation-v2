import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Observable } from "rxjs";
import {
  IConcernSummary,
  IEntity,
  IGetConcernResponse
} from "../../concern.interfaces";

@Injectable({
  providedIn: "root"
})
export class ConcernService {
  constructor(private http: HttpClient) {}

  getConcernHistory(gmcNumber: number): Observable<IGetConcernResponse | any> {
    return this.http.get<IGetConcernResponse>(
      `${environment.appUrls.getConcern}/${gmcNumber}`
    );
  }

  /**
   * Conditionally add `employer, grade & site` fields
   * as per there validation rules
   * @param payload - IAddConcernRequest
   */
  public generatePayload(payload: IConcernSummary): IConcernSummary {
    return {
      ...payload,
      employer: payload.employer ? payload.employer : undefined,
      grade: payload.grade ? payload.grade : undefined,
      site: payload.site ? payload.site : undefined,
      source: payload.source,
      concernType: payload.concernType
    };
  }

  /**
   * This method is needed to massage the data received from the GET api
   * as BE is sending different data type in the GET api
   * and expect different data type on the POST api
   * @param data - any[]
   * @param labelProperty - string
   */
  public massageData(data: any[], labelProperty: string): IEntity[] {
    if (!data || !data.map) {
      return;
    }

    return data.map((item) => {
      return {
        id: item.id,
        label: item[labelProperty]
      };
    });
  }

  public addConcern(payload: IConcernSummary): Observable<string> {
    return this.http.post(
      environment.appUrls.addConcern,
      this.generatePayload(payload),
      {
        responseType: "text"
      }
    );
  }

  public compareFn(optionOne: IEntity, optionTwo: IEntity): boolean {
    return optionOne && optionTwo ? optionOne.id === optionTwo.id : false;
  }
}
