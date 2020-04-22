import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { INote } from "../revalidation-history.interface";

@Injectable({
  providedIn: "root"
})
export class RevalidationNotesService {
  constructor(private http: HttpClient) {}

  getRevalidationNotes(params: HttpParams): Observable<INote[] | any> {
    return this.http.get<INote[]>(``, { params });
  }

  updateRevalidationNote(note: INote): Observable<INote | any> {
    return this.http.post<INote>(``, note); // TODO: check return value for state patch
  }

  insertRevalidationNote(note: INote): Observable<INote | any> {
    return this.http.post<INote>(``, note);
  }
}
