import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";
import { IAdmin } from "./admins.interfaces";
import { AdminsState } from "./state/admins.state";

@Pipe({
  name: "AdminName"
})
export class AdminsPipe implements PipeTransform {
  private admins: IAdmin[] = this.store.selectSnapshot(AdminsState).items;

  constructor(private store: Store) {}

  transform(email: string, format?: string): string {
    if (email && this.admins) {
      const admin: IAdmin = this.admins.find(
        (a: IAdmin) => a.username === email
      );

      if (format === "email") {
        return admin ? admin.email : email;
      } else {
        return admin ? admin.fullName : email;
      }
    }

    return email ? email : "";
  }
}
