import { Pipe, PipeTransform } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";
@Pipe({
  name: "splitStringToHTML"
})
export class SplitStringToHTMLPipe implements PipeTransform {
  transform(value: string, delimiter: string = "|"): SafeHtml {
    if (value && value.includes(delimiter)) {
      return value
        .split(delimiter)
        .map((item: string) => `<span class='split-item'>${item}</span>`)
        .join(" ");
    }
    return value;
  }
}
