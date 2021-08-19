import { Injectable } from "@angular/core";
import { NativeDateAdapter } from "@angular/material/core";

@Injectable()
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
export class CustomDateAdapter extends NativeDateAdapter {
  parse(value: any): Date | null {
    if (typeof value === "string" && value.indexOf("/") > -1) {
      const str = value.split("/");

      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);

      return new Date(year, month, date);
    }
    const dateTime = typeof value === "number" ? value : Date.parse(value);
    return isNaN(dateTime) ? null : new Date(dateTime);
  }
}
