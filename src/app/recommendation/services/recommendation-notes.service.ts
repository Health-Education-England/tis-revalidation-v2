import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { INote } from "../recommendation-history.interface";
import { environment } from "@environment";

@Injectable({
  providedIn: "root"
})
export class RecommendationNotesService {
  constructor(private http: HttpClient) {}

  getRecommendationNotes(params: HttpParams): Observable<INote[] | any> {
    return this.http.get<INote[]>(`${environment.appUrls.getNotes}`, {
      params
    });
  }

  updateRecommendationNote(note: INote): Observable<INote | any> {
    return this.http.post<INote>(``, note); // TODO: check return value for state patch
  }

  insertRecommendationNote(note: INote): Observable<INote | any> {
    return this.http.post<INote>(``, note);
  }
}
