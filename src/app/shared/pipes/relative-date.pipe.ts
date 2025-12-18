import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "relativeDate"
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: string): string {
    if (value === null) return;

    // Get the current time
    const now = moment();

    // Parse the input date string
    const created = moment(value);

    // Calculate the difference in days
    const diff = now.diff(created, "days");

    // If less than 1 day ago
    if (diff < 1) {
      // If less than 1 minute ago
      if (now.diff(created, "minutes") < 1) {
        return "just now";
      }

      // If less than 1 hour ago
      if (now.diff(created, "hours") < 1) {
        // Return the difference in minutes with 'mins ago' suffix
        return `${now.diff(created, "minutes")} mins ago`;
      }

      // Return the difference in hours with 'hours ago' suffix
      return `${now.diff(created, "hours")} hours ago`;
    }
    // If exactly 1 day ago
    else if (diff === 1) {
      return "Yesterday";
    }
    // If less than 7 days ago
    else if (diff < 7) {
      return `${diff} days ago`;
    }
    // If 7 or more days ago
    else {
      // Return a formatted date
      return created.format("DD MMM YYYY HH:mm");
    }
  }
}
