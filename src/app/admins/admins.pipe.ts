import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngxs/store";
import { IAdmin } from "./admins.interfaces";
import { AdminsState } from "./state/admins.state";
import { AuthService } from "../core/auth/auth.service";
import { switchMap } from "rxjs/operators";

@Pipe({
  name: "AdminName"
})
export class AdminsPipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform(username: string, format?: string): string {
    if (username) {
      return format === "email"
        ? this.authService.email
        : ` ${this.authService.givenName} ${this.authService.familyName}`;
    }

    return username;
  }
}
