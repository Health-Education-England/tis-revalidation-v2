import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@environment";
import { HttpClient } from "@angular/common/http";
import { IDetailsSideNav } from "../details-side-nav.interfaces";
import { INote } from "../../notes-drawer/notes-drawer.interfaces";

@Injectable({
  providedIn: "root"
})
export class DetailsSideNavService {
  constructor(private http: HttpClient) {}

  getDetails(gmcNumber: number): Observable<IDetailsSideNav | any> {
    return this.http.get<IDetailsSideNav>(
      `${environment.appUrls.getDetails}/${gmcNumber}`
    );
  }

  addNote(note: INote): Observable<INote | any> {
    return this.http.post<INote>(`${environment.appUrls.addNote}`, note);
  }

  editNote(note: INote): Observable<INote | any> {
    return this.http.put<INote>(`${environment.appUrls.editNote}`, note);
  }
}
