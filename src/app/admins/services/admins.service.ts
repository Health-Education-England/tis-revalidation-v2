import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IAllocateAdmin } from "../admins.interfaces";

@Injectable({
  providedIn: "root"
})
export class AdminsService {
  public selectedAdmin$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  public resetForm$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  public getAdminUsers(): Observable<any> {
    return this.http.get(environment.appUrls.listAdmins);
  }

  public submitAllocateList(payload: IAllocateAdmin[]): Observable<any> {
    return this.http.post(environment.appUrls.allocateAdmin, {
      traineeAdmins: payload
    });
  }
}
