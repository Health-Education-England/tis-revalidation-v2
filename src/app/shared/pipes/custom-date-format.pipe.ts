import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";
import { environment } from "@environment";
@Pipe({
  name: "customDateFormat"
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    let date = new Date(value);
    let diff = (new Date().getTime() - date.getTime()) / 1000;
    let daydiff = Math.floor(diff / 86400);
    if (isNaN(daydiff) || daydiff < 0 || daydiff >= 1) {
      const datePipe = new DatePipe("en-US");
      return datePipe.transform(value, environment.dateTimeFormat);
    } else {
      return (
        daydiff == 0 &&
        ((diff < 60 && "Just now") ||
          (diff < 120 && "1 minute ago") ||
          (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
          (diff < 7200 && "1 hour ago") ||
          (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))
        //(daydiff == 1 && "Yesterday")
        // (daydiff < 7 && daydiff + " days ago") ||
        // (daydiff < 31 && Math.ceil(daydiff / 7) + " week(s) ago")
      );
    }
  }
}
