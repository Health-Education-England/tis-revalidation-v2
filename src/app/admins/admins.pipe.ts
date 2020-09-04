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

  transform(username: string, format?: string): string {
    if (username && this.admins) {
      const admin: IAdmin = this.admins.find(
        (a: IAdmin) => a.username === username
      );

      return admin
        ? format === "email"
          ? admin.email
          : admin.fullName
        : username;
    }

    return username ? username : "";
  }
}
