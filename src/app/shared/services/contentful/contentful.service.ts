import { Injectable } from "@angular/core";
import { createClient, Entry, EntryCollection } from "contentful";
import { environment } from "@environment";
import { map, filter } from "rxjs/operators";
import { from, Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ContentfulService {
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken
  });

  getAllEntries(): Observable<any> {
    const promise = this.client.getEntries({
      content_type: "revalMessages"
    });
    return from(promise);
  }
  getAlerts(): any {
    const dateNow = new Date().toISOString();
    return from(
      this.client.getEntries({
        content_type: "revalMessages",
        "fields.type": "Alert",
        "fields.date[lte]": dateNow,
        "fields.expiryDate[gte]": dateNow
      })
    ).pipe(map((entries) => entries.items));
  }
}
